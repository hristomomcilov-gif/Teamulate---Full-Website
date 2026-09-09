#!/usr/bin/env node
/**
 * LOCKED SITECHROME parity check — docs/LOCKED_SITECHROME.md
 *
 * Runs against the static export in out/ (after `next build`) and fails when
 * any marketing page ships a header or footer that differs from the homepage.
 * The homepage (out/index.html) is the reference; every other exported HTML
 * document must contain exactly one <header> and one <footer> whose markup is
 * byte-identical after removing the current-page highlight.
 *
 * Also verifies the locked CTAs on every page: Launch Demo → the filled demo
 * document (full document load) and Login → /app/.
 *
 * Usage: node scripts/check-sitechrome-parity.mjs [out-dir]
 *        npm run check:chrome
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const OUT = resolve(process.argv[2] ?? "out");
const LAUNCH_DEMO_HREF = "/demo/dashboard/dashboard.html";

/** Not marketing chrome: the product demo recreation, the client area, auth, shop, Next internals. */
const EXCLUDED_PREFIXES = ["demo/", "app/", "auth/", "shop/", "_next/", "stg/demo/", "stg/app/"];
/** Standalone client-login field form (hosting/README.md); export scripts drop it from the live zip. */
const EXCLUDED_FILES = new Set(["client-login.html", "stg/client-login.html"]);

if (!existsSync(OUT)) {
  console.error(`check-sitechrome-parity: ${OUT} does not exist. Run \`next build\` first.`);
  process.exit(2);
}

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (entry.endsWith(".html")) acc.push(full);
  }
  return acc;
}

function rel(file) {
  return relative(OUT, file).split("\\").join("/");
}

/** Static export can carry a basePath (/stg). Reduce hrefs to the bare route. */
function stripBasePath(html, basePath) {
  if (!basePath) return html;
  return html.split(`href="${basePath}/`).join('href="/').split(`src="${basePath}/`).join('src="/');
}

function extract(html, tag) {
  const open = html.indexOf(`<${tag}`);
  if (open === -1) return { count: 0, markup: "" };
  const close = html.indexOf(`</${tag}>`, open);
  const markup = close === -1 ? "" : html.slice(open, close + tag.length + 3);
  const count = html.split(`<${tag}`).length - 1;
  return { count, markup };
}

/** Only the current-route highlight may differ between pages. */
function normalize(markup) {
  return markup.replace(/ aria-current="page"/g, "").replace(/hover:text-brand text-brand(?=[" ])/g, "hover:text-brand text-ink");
}

function firstDifference(a, b) {
  const max = Math.min(a.length, b.length);
  let i = 0;
  while (i < max && a[i] === b[i]) i++;
  const from = Math.max(0, i - 80);
  return {
    at: i,
    expected: a.slice(from, i + 160),
    received: b.slice(from, i + 160),
  };
}

const referenceFile = join(OUT, "index.html");
if (!existsSync(referenceFile)) {
  console.error(`check-sitechrome-parity: homepage ${rel(referenceFile)} missing from export.`);
  process.exit(2);
}

// A staging export (TEAMULATE_STAGING_BASE=1) prefixes routed hrefs with /stg.
// Detect it from the compiled stylesheet link so both exports are checked alike.
const rawHome = readFileSync(referenceFile, "utf8");
const basePath = rawHome.match(/<link rel="stylesheet" href="(\/[^"/]+)?\/_next\//)?.[1] ?? "";
const homeHtml = stripBasePath(rawHome, basePath);
const homeHeader = extract(homeHtml, "header");
const homeFooter = extract(homeHtml, "footer");

const failures = [];

function fail(file, message, detail) {
  failures.push({ file, message, detail });
}

// Reference sanity: the homepage itself must carry the locked chrome.
if (homeHeader.count !== 1 || !homeHeader.markup) fail("index.html", "homepage must contain exactly one <header>");
if (homeFooter.count !== 1 || !homeFooter.markup) fail("index.html", "homepage must contain exactly one <footer>");
if (!homeHeader.markup.includes('<nav aria-label="Main"')) fail("index.html", 'header is missing nav[aria-label="Main"]');
if (!homeHeader.markup.includes(`href="${LAUNCH_DEMO_HREF}"`)) fail("index.html", `header Launch Demo must link to ${LAUNCH_DEMO_HREF}`);
if (!homeHeader.markup.includes('href="/app/"')) fail("index.html", "header Login must link to /app/");
if (homeHeader.markup.includes('href="/demo/dashboard/"')) fail("index.html", "header must not link to the Next demo route (soft-nav risk)");
for (const label of ["How it works", "About", "Pricing", "Blog", "Demo", "Login", "Launch Demo"]) {
  if (!homeHeader.markup.includes(label)) fail("index.html", `header is missing "${label}"`);
}
if ((homeFooter.markup.match(/aria-label="Teamulate on social"/g) ?? []).length !== 1) {
  fail("index.html", "footer must contain exactly one social row");
}
for (const group of ["Footer Product", "Footer Guides", "Footer Plans", "Footer Company"]) {
  if (!homeFooter.markup.includes(`aria-label="${group}"`)) fail("index.html", `footer is missing nav[aria-label="${group}"]`);
}
if (!homeFooter.markup.includes("Stay in the loop")) fail("index.html", "footer is missing the newsletter block");

const pages = walk(OUT)
  .map(rel)
  .filter((f) => !EXCLUDED_PREFIXES.some((p) => f.startsWith(p)) && !EXCLUDED_FILES.has(f))
  .filter((f) => f !== rel(referenceFile))
  .sort();

for (const page of pages) {
  const html = stripBasePath(readFileSync(join(OUT, page), "utf8"), basePath);
  const header = extract(html, "header");
  const footer = extract(html, "footer");

  if (header.count !== 1) {
    fail(page, `expected exactly one <header>, found ${header.count}`);
    continue;
  }
  if (footer.count !== 1) {
    fail(page, `expected exactly one <footer>, found ${footer.count}`);
    continue;
  }
  if (normalize(header.markup) !== normalize(homeHeader.markup)) {
    fail(page, "header differs from homepage", firstDifference(normalize(homeHeader.markup), normalize(header.markup)));
  }
  if (footer.markup !== homeFooter.markup) {
    fail(page, "footer differs from homepage", firstDifference(homeFooter.markup, footer.markup));
  }
  // The page must load the same compiled stylesheet(s) as the homepage — a page
  // carrying Tailwind class names without the Tailwind CSS is the live About Chris bug.
  const homeCss = (homeHtml.match(/<link rel="stylesheet" href="[^"]+"/g) ?? []).sort().join("\n");
  const pageCss = (html.match(/<link rel="stylesheet" href="[^"]+"/g) ?? []).sort().join("\n");
  if (homeCss !== pageCss) fail(page, "stylesheet links differ from homepage", { expected: homeCss, received: pageCss });
}

if (failures.length) {
  console.error(`\nLOCKED SITECHROME parity FAILED — ${failures.length} problem(s) across ${pages.length + 1} exported page(s):\n`);
  for (const f of failures) {
    console.error(`  ✗ ${f.file}: ${f.message}`);
    if (f.detail) {
      if (typeof f.detail.at === "number") console.error(`      first difference at char ${f.detail.at}`);
      console.error(`      expected … ${JSON.stringify(f.detail.expected)}`);
      console.error(`      received … ${JSON.stringify(f.detail.received)}`);
    }
  }
  console.error("\nEvery marketing page must inherit SiteHeader/SiteFooter via SiteChrome. See docs/LOCKED_SITECHROME.md.\n");
  process.exit(1);
}

console.log(
  `LOCKED SITECHROME parity OK — ${pages.length + 1} exported pages share the homepage header + footer` +
    ` (Launch Demo → ${LAUNCH_DEMO_HREF}, Login → /app/).`,
);
