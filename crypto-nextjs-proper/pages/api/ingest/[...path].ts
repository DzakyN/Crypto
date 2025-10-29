// Next.js pages API proxy
import type { NextApiRequest, NextApiResponse } from 'next';

const BE_BASE = process.env.TRACKER_BE_BASE_URL!;       // e.g. http://202.10.42.99:1323/api/v1
const ORG_ID  = process.env.TRACKER_ORG_ID!;
const BEARER  = process.env.TRACKER_BEARER_TOKEN!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Api-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');
    res.status(204).end();
    return;
  }
  const path = Array.isArray(req.query.path) ? req.query.path.join('/') : String(req.query.path||'');
  const target = `${BE_BASE.replace(/\/$/,'')}/${path}`;

  const headers: Record<string,string> = { 'authorization': `Bearer ${BEARER}` };
  if (req.headers['content-type']) headers['content-type'] = String(req.headers['content-type']);

  const r = await fetch(target, { method: req.method, headers, body: ['POST','PATCH','PUT'].includes(String(req.method)) ? JSON.stringify(req.body) : undefined });
  const buf = await r.arrayBuffer();
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Api-Key');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');
  res.status(r.status).send(Buffer.from(buf));
}
