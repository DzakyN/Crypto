export function setConsentCookie() {
  document.cookie = 'tracking_consent=true; max-age=31536000; path=/';
}
export function hasConsent() {
  return document.cookie.split(';').map(s=>s.trim()).includes('tracking_consent=true');
}
