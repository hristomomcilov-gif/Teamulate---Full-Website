/**
 * Orchestration adapter contract per spec §5.3. Application code depends on
 * this interface, never on a hard-coded provider. Implementation order:
 * MockOrchestratorAdapter -> ManualBridgeAdapter -> GrokBotAdapter (only
 * after the actual integration method, auth and reliability are verified).
 */
import type { RiskTier } from "./enums";

export type ActorRef = { type: "user" | "agent" | "service" | "system"; id: string };

export type NormalizedTaskRequest = {
  taskId: string;
  organizationId: string;
  objective: string;
  successCriteria: string[];
  ownerAgent: string;
  supportingAgents: string[];
  approvedKnowledgeRefs: string[];
  evidenceRefs: string[];
  constraints: string[];
  allowedTools: string[];
  prohibitedActions: string[];
  outputSchema: unknown;
  riskTier: RiskTier;
  deadline?: string;
};

export type SubmissionReceipt = { taskId: string; acceptedAt: string; providerRef?: string };
export type CancelResult = { taskId: string; cancelled: boolean; reason?: string };
export type NormalizedTaskStatus = {
  taskId: string;
  status: "queued" | "running" | "completed" | "failed" | "cancelled" | "unknown";
  updatedAt: string;
  detail?: string;
};
export type OrchestratorResultEvent = {
  taskId: string;
  traceId: string;
  outputSchemaVersion: number;
  output: unknown;
  evidenceRefs: string[];
  confidence?: "high" | "medium" | "low";
  requestedActions: unknown[];
};
export type ProviderHealth = { healthy: boolean; checkedAt: string; detail?: string };

export interface AgentOrchestratorAdapter {
  submitTask(input: NormalizedTaskRequest): Promise<SubmissionReceipt>;
  cancelTask(taskId: string): Promise<CancelResult>;
  getTaskStatus(taskId: string): Promise<NormalizedTaskStatus>;
  ingestResult(event: OrchestratorResultEvent): Promise<void>;
  healthCheck(): Promise<ProviderHealth>;
}
