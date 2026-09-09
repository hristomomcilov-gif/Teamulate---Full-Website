(function () {
  if (window.__teamulateAboutNavInit) return;
  window.__teamulateAboutNavInit = true;
  var MARK = "data-teamulate-about-nav";
  var VER = "3";

  function isCurrent(path) {
    return location.pathname.indexOf(path) === 0;
  }

  // The trigger must look like a plain nav link on every page, including
  // pages that do not ship Tailwind preflight (no UA button box/border).
  // Values match SiteHeader's `rounded-md px-3 py-2 text-sm font-medium`.
  function styleTrigger(btn) {
    btn.style.appearance = "none";
    btn.style.webkitAppearance = "none";
    btn.style.background = "transparent";
    btn.style.border = "0";
    btn.style.borderRadius = "14px";
    btn.style.margin = "0";
    btn.style.padding = "8px 12px";
    btn.style.font = "inherit";
    btn.style.fontSize = "14px";
    btn.style.lineHeight = "20px";
    btn.style.fontWeight = "500";
    btn.style.letterSpacing = "inherit";
    btn.style.cursor = "pointer";
  }

  function styleMenu(el) {
    el.style.position = "absolute";
    el.style.top = "100%";
    el.style.left = "0";
    el.style.minWidth = "180px";
    el.style.background = "#fff";
    el.style.border = "1px solid #D5DCE6";
    el.style.borderRadius = "12px";
    el.style.padding = "8px";
    el.style.boxShadow = "0 12px 28px rgba(26,39,68,.12)";
    el.style.zIndex = "60";
  }

  function styleItem(a, active) {
    a.style.display = "block";
    a.style.padding = "10px 12px";
    a.style.borderRadius = "8px";
    a.style.fontSize = "14px";
    a.style.fontWeight = "600";
    a.style.textDecoration = "none";
    a.style.color = active ? "#5B4BDB" : "#1A2744";
  }

  function makeDropdown() {
    var wrap = document.createElement("div");
    wrap.setAttribute(MARK, VER);
    wrap.className = "relative";
    wrap.style.position = "relative";

    var btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-haspopup", "true");
    var chrisActive = isCurrent("/about-chris");
    var teamActive = isCurrent("/team");
    // Same rule as SiteHeader: the trigger is brand violet when a child is current.
    btn.className =
      "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:text-brand " +
      (chrisActive || teamActive ? "text-brand" : "text-ink");
    styleTrigger(btn);
    btn.innerHTML = 'About <span aria-hidden="true" style="font-size:10px">▾</span>';

    var menu = document.createElement("div");
    menu.hidden = true;
    styleMenu(menu);

    var chris = document.createElement("a");
    chris.href = "/about-chris/";
    chris.textContent = "Chris";
    styleItem(chris, chrisActive);

    var team = document.createElement("a");
    team.href = "/team/";
    team.textContent = "The Team";
    styleItem(team, teamActive);

    menu.appendChild(chris);
    menu.appendChild(team);
    wrap.appendChild(btn);
    wrap.appendChild(menu);

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      menu.hidden = open;
    });

    return wrap;
  }

  function isDesktopCluster(el) {
    if (!el || !el.className || typeof el.className !== "string") return false;
    var c = el.className;
    // Next SiteHeader desktop cluster: hidden ... lg:flex
    return c.indexOf("lg:flex") !== -1 || c.indexOf("lg:flex") !== -1;
  }

  function findDesktopCluster(nav) {
    if (!nav) return null;
    var nodes = nav.querySelectorAll("div");
    for (var i = 0; i < nodes.length; i++) {
      if (isDesktopCluster(nodes[i]) && nodes[i].querySelector('a[href="/how-it-works/"], a[href="/team/"]')) {
        return nodes[i];
      }
    }
    return null;
  }

  function replaceDesktopTeam(cluster) {
    if (!cluster) return;
    if (cluster.querySelector("[" + MARK + '="' + VER + '"]')) return;
    // remove any old v1 injects inside desktop only
    var old = cluster.querySelector("[" + MARK + '="1"]');
    if (old && old.parentNode) old.parentNode.removeChild(old);

    var links = cluster.querySelectorAll('a[href="/team/"]');
    var target = null;
    for (var i = 0; i < links.length; i++) {
      var t = (links[i].textContent || "").trim();
      if (t === "Team") { target = links[i]; break; }
    }
    if (!target || !target.parentNode) return;
    // Never alter classList on the desktop cluster (keeps hidden lg:flex)
    var dd = makeDropdown();
    target.parentNode.replaceChild(dd, target);
  }

  function replaceMobileTeam() {
    var mobile = document.getElementById("mobile-nav");
    if (!mobile) return;
    if (mobile.querySelector("[" + MARK + '-mobile="' + VER + '"]')) return;
    var old = mobile.querySelector("[" + MARK + '-mobile="1"]');
    if (old && old.parentNode) old.parentNode.removeChild(old);

    var links = mobile.querySelectorAll('a[href="/team/"]');
    var target = null;
    for (var i = 0; i < links.length; i++) {
      var t = (links[i].textContent || "").trim();
      if (t === "Team") { target = links[i]; break; }
    }
    if (!target || !target.parentNode) return;

    var block = document.createElement("div");
    block.setAttribute(MARK + "-mobile", VER);
    block.style.display = "grid";
    block.style.gap = "2px";
    block.style.padding = "4px 0";

    var label = document.createElement("div");
    label.textContent = "About";
    label.style.padding = "8px 12px";
    label.style.fontSize = "12px";
    label.style.fontWeight = "700";
    label.style.letterSpacing = "0.08em";
    label.style.textTransform = "uppercase";
    label.style.color = "#5B4BDB";

    var chris = document.createElement("a");
    chris.href = "/about-chris/";
    chris.textContent = "Chris";
    chris.className = target.className;

    var team = document.createElement("a");
    team.href = "/team/";
    team.textContent = "The Team";
    team.className = target.className;

    block.appendChild(label);
    block.appendChild(chris);
    block.appendChild(team);
    target.parentNode.replaceChild(block, target);
  }

  function ensure() {
    var nav = document.querySelector('header nav[aria-label="Main"], nav[aria-label="Main"]');
    if (!nav) return;
    var desktop = findDesktopCluster(nav);
    replaceDesktopTeam(desktop);
    replaceMobileTeam();
  }

  function boot() {
    ensure();
    try {
      new MutationObserver(ensure).observe(document.documentElement, { childList: true, subtree: true });
    } catch (e) {}
    var n = 0;
    var t = setInterval(function () {
      ensure();
      if (++n > 50) clearInterval(t);
    }, 400);
    document.addEventListener("click", function () {
      document.querySelectorAll("[" + MARK + '="' + VER + '"] button[aria-expanded="true"]').forEach(function (btn) {
        btn.setAttribute("aria-expanded", "false");
        var menu = btn.parentNode && btn.parentNode.querySelector("div");
        if (menu) menu.hidden = true;
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
