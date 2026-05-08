/**
 * Per-site RealScout identifiers (Vercel env). See portfolio `realscout-integration.mdc`.
 */
export function getRealScoutAgentEncodedId(): string {
  return (
    process.env.NEXT_PUBLIC_REALSCOUT_AGENT_ENCODED_ID?.trim() ??
    "QWdlbnQtMjI1MDUw"
  );
}
