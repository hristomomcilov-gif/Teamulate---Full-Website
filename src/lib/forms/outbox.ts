import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Secure server-side outbox (ADR-004). Submissions persist here first; the
 * CRM adapter drains the outbox once credentials are provisioned. On
 * serverless production hosting this must be re-pointed to a durable store —
 * flagged as assumption A6 in docs/KNOWN_GAPS_AND_ASSUMPTIONS.md.
 */
const OUTBOX_DIR = path.join(process.cwd(), ".data", "outbox");

export type OutboxRecord = {
  id: string;
  kind: "demo-request" | "contact";
  receivedAt: string;
  payload: Record<string, unknown>;
  attribution: {
    landingPath?: string;
    referrerCategory?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    ctaId?: string;
  };
  crmSync: { status: "pending" | "synced" | "failed"; attempts: number };
};

function fileFor(idempotencyKey: string): string {
  // Idempotency key is validated as a UUID upstream, so it is filesystem-safe.
  return path.join(OUTBOX_DIR, `${idempotencyKey}.json`);
}

export async function alreadySubmitted(idempotencyKey: string): Promise<boolean> {
  return existsSync(fileFor(idempotencyKey));
}

export async function persistSubmission(idempotencyKey: string, record: OutboxRecord): Promise<void> {
  await mkdir(OUTBOX_DIR, { recursive: true });
  await writeFile(fileFor(idempotencyKey), JSON.stringify(record, null, 2), { flag: "wx" }).catch((err: NodeJS.ErrnoException) => {
    if (err.code === "EEXIST") return; // concurrent duplicate — idempotent no-op
    throw err;
  });
}

export async function readSubmission(idempotencyKey: string): Promise<OutboxRecord | null> {
  try {
    const raw = await readFile(fileFor(idempotencyKey), "utf8");
    return JSON.parse(raw) as OutboxRecord;
  } catch {
    return null;
  }
}
