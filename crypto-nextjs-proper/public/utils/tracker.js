// Minimal tracker for Next.js sites
import { TRACKER_CONFIG } from './tracker.config.js';
import { setConsentCookie, hasConsent } from './cookie.js';

let sessionId = null;

async function post(path, body) {
  const url = TRACKER_CONFIG.baseUrl.replace(/\/$/,'') + path;
  const headers = { 'Content-Type': 'application/json' };
  // Authorization is injected by proxy on server-side; no header here on client
  if (TRACKER_CONFIG.debug) console.log('[tracker] ->', url, body);
  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
  return res.json().catch(()=>({}));
}
async function patch(path, body) {
  const url = TRACKER_CONFIG.baseUrl.replace(/\/$/,'') + path;
  const headers = { 'Content-Type': 'application/json' };
  if (TRACKER_CONFIG.debug) console.log('[tracker] PATCH ->', url, body);
  const res = await fetch(url, { method: 'PATCH', headers, body: JSON.stringify(body) });
  return res.json().catch(()=>({}));
}

export async function initAutoTracking() {
  try {
    if (!hasConsent()) setConsentCookie();
    // start session
    const meta = { screen: { w: window.innerWidth, h: window.innerHeight } };
    const resp = await post('/sessions/start', {
      organization_id: TRACKER_CONFIG.organizationId,
      user_agent: navigator.userAgent,
      meta
    });
    sessionId = resp.session_id || resp.id || sessionStorage.getItem('session_id') || crypto.randomUUID();
    sessionStorage.setItem('session_id', sessionId);

    // initial pageview
    await trackPageView(location.pathname + location.search, document.title, document.referrer);

    // clicks
    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-track], .track-cta');
      if (!t) return;
      const name = t.getAttribute('data-track') || 'cta_click';
      const label = t.getAttribute('data-label') || t.textContent?.trim()?.slice(0,80);
      trackCustomEvent(name, { label, href: t.getAttribute('href') });
    }, { capture: true });

    // forms
    document.addEventListener('submit', async (e) => {
      const form = e.target;
      if (!(form instanceof HTMLFormElement)) return;
      const formName = form.getAttribute('name') || form.getAttribute('id') || 'form';
      const fields = {};
      new FormData(form).forEach((v,k) => fields[k]=v);
      await trackFormSubmit(formName, fields);
    });

    // end session
    window.addEventListener('pagehide', () => {
      if (sessionId) patch(`/sessions/${sessionId}/end`, { ended_at: new Date().toISOString() });
    });
  } catch (err) {
    console.error('[tracker] init error', err);
  }
}

export async function trackPageView(url, title, referrer) {
  if (!sessionId) sessionId = sessionStorage.getItem('session_id');
  return post('/pages', { session_id: sessionId, url, title, referrer, ts: new Date().toISOString(), meta:{} });
}
export async function trackCustomEvent(type, props={}) {
  if (!sessionId) sessionId = sessionStorage.getItem('session_id');
  return post('/events', { session_id: sessionId, type, name: type, props, ts: new Date().toISOString() });
}
export async function trackFormSubmit(form_name, fields) {
  if (!sessionId) sessionId = sessionStorage.getItem('session_id');
  await trackCustomEvent('form_submit', { form_name, ...fields });
  return post('/forms', { session_id: sessionId, form_name, fields, ts: new Date().toISOString() });
}
