// @ts-nocheck
import tradly from 'tradly';

/**
 * Ensure the Tradly SDK has its API token + environment configured in this
 * server process.
 *
 * APPCONSTANT inside the SDK is process-global and was previously only set
 * as a side effect of a browser calling GET /api (pages/api/index.js).
 * That meant SSR (getServerSideProps) and API routes could run with no
 * token — producing 401s from api.tradly.app — depending purely on request
 * ordering. Call this before any server-side tradly.* usage instead.
 */
let configured = false;
export function ensureTradlyServerConfig() {
  if (configured) return;
  tradly.init.config({
    token: process.env.TRADLY_API_KEY || process.env.API_KEY,
    environment: process.env.ENVIRONMENT,
  });
  configured = true;
}
