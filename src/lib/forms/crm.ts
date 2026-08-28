import type { OutboxRecord } from "./outbox";

/**
 * CRM adapter seam (ADR-004). The HubSpot implementation is added only when
 * portal credentials are provisioned (blocker for Chris in
 * docs/IMPLEMENTATION_STATUS.md). Until then submissions remain safely in
 * the outbox with crmSync.status = "pending".
 */
export interface CrmAdapter {
  syncSubmission(record: OutboxRecord): Promise<{ status: "synced" | "deferred" }>;
}

export class NoopOutboxCrmAdapter implements CrmAdapter {
  async syncSubmission(): Promise<{ status: "deferred" }> {
    return { status: "deferred" };
  }
}

export function getCrmAdapter(): CrmAdapter {
  return new NoopOutboxCrmAdapter();
}
