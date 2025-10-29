// Fill these in Vercel project ENV for production; for local quick test you can hardcode.
export const TRACKER_CONFIG = {
  baseUrl: "/api/ingest", // go through proxy to keep token secret
  organizationId: process.env.NEXT_PUBLIC_TRACKER_ORG_ID || "ORG_ID_DEV",
  bearerToken: "IGNORED_IN_PROXY",
  debug: true,
};
