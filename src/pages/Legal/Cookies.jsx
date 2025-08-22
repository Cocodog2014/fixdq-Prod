import { useEffect } from 'react';
import GlobalHeader from '../../components/GlobalHeader';

/**
 * Cookies & Analytics Notice (client-side)
 * - Injects GA4 script (if gaId provided)
 * - Describes minimal storage usage
 * - Uses shared legal CSS (no inline style objects beyond minimal wrapper)
 */
export default function Cookies({ lastUpdated = '2025-08-22', gaId = 'G-XXXXXXX' }) {
  useEffect(() => {
    if (!gaId || gaId === 'G-XXXXXXX') return; // skip if placeholder
    const src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      document.head.appendChild(s);
    }
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    // store globally once
    if (!window.gtag) window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', gaId, { anonymize_ip: true, transport_type: 'beacon' });
  }, [gaId]);

  return (
    <div className="cookies-page gradient-page">
      <GlobalHeader />
      <main className="legal-generic container" aria-labelledby="cookies-heading">
        <h1 id="cookies-heading">Cookies & Analytics</h1>
        <p>FixDQ uses minimal local storage (preferences, temporary UI state) and may load a single analytics script (Google Analytics 4) to understand aggregate usage. No personal or ELD operational data is transmitted to our servers because the app runs client-side.</p>
        <h2>Types We Use</h2>
        <ul className="legal-list">
          <li><strong>Essential:</strong> Local browser storage for interface preferences and routing helpers.</li>
          <li><strong>Analytics (optional):</strong> GA4 for anonymous visit counts and page flow (IP anonymized).</li>
        </ul>
        <h2>Your Choices</h2>
        <p>You can block or clear cookies / site storage in your browser settings. The core site remains functional without analytics enabled.</p>
        <p className="legal-note">Last updated {lastUpdated}</p>
        {gaId === 'G-XXXXXXX' && (
          <p className="legal-note">Analytics placeholder ID in use. Provide a real GA4 ID via the component prop to enable tracking.</p>
        )}
      </main>
    </div>
  );
}
