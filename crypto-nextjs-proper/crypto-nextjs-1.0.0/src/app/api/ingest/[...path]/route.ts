export const dynamic = "force-dynamic";
export const runtime = "nodejs";


import { NextRequest, NextResponse } from 'next/server';

const BE_BASE = process.env.TRACKER_BE_BASE_URL!;       // e.g. http://202.10.42.99:1323/api/v1
const ORG_ID  = process.env.TRACKER_ORG_ID!;
const BEARER  = process.env.TRACKER_BEARER_TOKEN!;
const TIMEOUT_MS = 8000;

export async function OPTIONS(req: NextRequest) {
  const res = new NextResponse(null, { status: 204 });
  res.headers.set('access-control-allow-origin', req.headers.get('origin') ?? '*');
  res.headers.set('access-control-allow-headers', 'Content-Type, Authorization, X-Api-Key');
  res.headers.set('access-control-allow-methods', 'GET,POST,PATCH,OPTIONS');
  res.headers.set('access-control-max-age', '86400');
  return res;
}

async function forward(req: NextRequest, { params }: { params: { path: string[] } }) {
  const method = req.method.toUpperCase();
  const urlPath = (params?.path || []).join('/');
  const target = `${BE_BASE.replace(/\/$/,'')}/${urlPath}`;

  const hasBody = ['POST','PATCH','PUT'].includes(method);
  const body = hasBody ? await req.arrayBuffer() : undefined;

  const headers = new Headers();
  const ct = req.headers.get('content-type');
  if (ct) headers.set('content-type', ct);
  headers.set('authorization', `Bearer ${BEARER}`);
  headers.set('x-org-id', ORG_ID);

  const controller = new AbortController();
  const to = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(target, { method, headers, body, signal: controller.signal });
    const buf = await res.arrayBuffer();
    const out = new NextResponse(buf, { status: res.status });
    out.headers.set('access-control-allow-origin', req.headers.get('origin') ?? '*');
    out.headers.set('access-control-allow-headers', 'Content-Type, Authorization, X-Api-Key');
    out.headers.set('access-control-allow-methods', 'GET,POST,PATCH,OPTIONS');
    return out;
  } finally {
    clearTimeout(to);
  }
}

export async function POST(req: NextRequest, ctx: any)  { return forward(req, ctx); }
export async function PATCH(req: NextRequest, ctx: any) { return forward(req, ctx); }
export async function GET(req: NextRequest, ctx: any)   { return forward(req, ctx); }
