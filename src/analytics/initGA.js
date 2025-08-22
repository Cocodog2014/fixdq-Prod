// initGA.js - lightweight GA4 bootstrap for FixDQ (client side)
// Usage: import { initGA } from './analytics/initGA'; initGA(import.meta.env.VITE_GA_MEASUREMENT_ID);

let initializedId = null;

export function initGA(measurementId, options = {}) {
  if (!measurementId || /XXXX|YOUR-GA-ID/i.test(measurementId)) {
    if (options.debug) console.info('[GA] No valid GA4 measurement ID provided; analytics disabled.');
    return false;
  }
  if (initializedId === measurementId) return true; // already initialized

  const src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  if (!document.querySelector(`script[src="${src}"]`)) {
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    document.head.appendChild(s);
  }
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  if (!window.gtag) window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId, { anonymize_ip: true, transport_type: 'beacon' });
  initializedId = measurementId;
  if (options.debug) console.info('[GA] GA4 initialized with ID', measurementId);
  return true;
}

// Simple pageview helper (manual route tracking if needed)
export function trackPageView(pathname = window.location.pathname, title) {
  if (!window.gtag || !initializedId) return;
  const params = { page_path: pathname };
  if (title) params.page_title = title;
  // Provide full location for GA4 debugging / analysis
  params.page_location = window.location.href;
  window.gtag('event', 'page_view', params);
}

// Generic event helper
export function trackEvent({ action, category = 'interaction', label, value, pageTitle }) {
  if (!window.gtag || !initializedId || !action) return;
  const params = { event_category: category };
  if (label) params.event_label = label;
  if (typeof value === 'number') params.value = value;
  // Attach current page title for better funneling unless explicitly overridden
  const currentTitle = pageTitle || document.title;
  if (currentTitle) params.page_title = currentTitle;
  window.gtag('event', action, params);
}

// Auto click tracking (delegated) — tracks elements with [data-track]
export function enableAutoClickTracking({ attribute = 'data-track', category = 'click', maxLabelLen = 120 } = {}) {
  if (window.__FIXDQ_AUTO_CLICK) return; // avoid double binding
  window.__FIXDQ_AUTO_CLICK = true;
  document.addEventListener('click', (e) => {
    if (!window.gtag) return;
    const el = e.target.closest(`[${attribute}]`) || e.target.closest('a,button');
    if (!el) return;
    let label = el.getAttribute(attribute);
    if (!label) {
      label = (el.innerText || el.getAttribute('aria-label') || el.getAttribute('title') || '').trim().replace(/\s+/g,' ').slice(0, maxLabelLen);
    }
    if (!label) return;
    trackEvent({ action: 'click', category, label });
  });
}
