
# Tracking Setup (Proper)

This project was augmented with a **serverless proxy** and a minimal **tracker** so it behaves like a real client website while safely forwarding analytics to your backend.

## ENV (set in Vercel Project Settings)
- `TRACKER_BE_BASE_URL` = http://YOUR_BE_HOST:1323/api/v1
- `TRACKER_ORG_ID` = UUID_ORG_KAMU
- `TRACKER_BEARER_TOKEN` = JWT_VALID_KAMU
- `NEXT_PUBLIC_TRACKER_ORG_ID` = UUID_ORG_KAMU

## Files added
- `public/utils/tracker.js` — starts session, sends pageviews, clicks, forms
- `public/utils/tracker.config.js` — client config (uses `/api/ingest` proxy)
- `public/utils/cookie.js` — consent helpers
- `pages/api/ingest/[...path].ts` — **proxy** inserting Authorization on the server
- Bootstrap snippet injected into `pages/_app.tsx` to initialize the tracker on the client

## Local dev
```bash
npm install
npm run dev
# open http://localhost:3000
```
> For local quick test without ENV, you can hardcode `baseUrl` in `public/utils/tracker.config.js` to hit your backend directly and set CORS accordingly.

## Production (Vercel)
- Push to GitHub, import to Vercel.
- Set ENV above, Deploy.
- No CORS change needed on BE if using proxy (requests originate from Vercel server).
