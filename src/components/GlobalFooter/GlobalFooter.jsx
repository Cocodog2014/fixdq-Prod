import fixdqLogo from '../../assets/logos/fixdq.png';
import { Link } from 'react-router-dom';

// Data: FMCSA official links & social links (could be externalized later if needed)
const fmcsaLinks = [
  { label: 'FMCSA Home', href: 'https://www.fmcsa.dot.gov' },
  { label: 'Registration', href: 'https://www.fmcsa.dot.gov/registration' },
  { label: 'Regulations', href: 'https://www.fmcsa.dot.gov/regulations' },
  { label: 'Hours of Service', href: 'https://www.fmcsa.dot.gov/regulations/hours-of-service' },
  { label: 'Medical Requirements', href: 'https://www.fmcsa.dot.gov/regulations/medical' },
  { label: 'DataQs Portal', href: 'https://dataqs.fmcsa.dot.gov/' },
  { label: 'Safety Measurement System', href: 'https://ai.fmcsa.dot.gov/sms/' },
  { label: 'CSA Program', href: 'https://csa.fmcsa.dot.gov/' },
];

const socialLinks = [
  { label: 'YouTube', href: '#', icon: '▶️' },
  { label: 'LinkedIn', href: '#', icon: '💼' },
  { label: 'Facebook', href: '#', icon: '📘' },
  { label: 'Instagram', href: '#', icon: '📸' },
  { label: 'X / Twitter', href: '#', icon: '𝕏' },
  { label: 'TikTok', href: '#', icon: '🎵' },
];

function GlobalFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="global-footer" aria-labelledby="footer-heading">
      <div className="container">
        <h2 id="footer-heading" className="visually-hidden">Site footer</h2>
        <div className="footer-grid">
          {/* Brand / Tagline */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo-link" aria-label="FixDQ Home">
              <img src={fixdqLogo} alt="FixDQ logo" className="footer-logo" />
            </Link>
            <p className="brand-tagline">Compliance & knowledge tools for professional drivers.</p>
            <p className="brand-mission">Helping you stay safe, compliant, and confident on the road.</p>
          </div>

            {/* Internal Navigation */}
          <nav className="footer-col nav-col" aria-label="Site navigation">
            <h3 className="footer-heading">Explore</h3>
            <ul className="footer-links">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/fmcsa-compliance">FMCSA Compliance</Link></li>
              <li><Link to="/vehicle-inspections">Vehicle Inspections</Link></li>
              <li><Link to="/eld-coach?roadmap=1">ELD Coach</Link></li>
              <li><Link to="/safety-training">Safety Training</Link></li>
              <li><Link to="/violations-management">Violations Management</Link></li>
              <li><Link to="/getting-started">Getting Started</Link></li>
            </ul>
          </nav>

          {/* FMCSA Official Links */}
          <nav className="footer-col fmcsa-col" aria-label="FMCSA official resources">
            <h3 className="footer-heading">FMCSA Official</h3>
            <ul className="footer-links">
              {fmcsaLinks.map(link => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          <div className="footer-col social-col" aria-label="Social media links">
            <h3 className="footer-heading">Connect</h3>
            <ul className="social-links">
              {socialLinks.map(s => (
                <li key={s.label}>
                  <a href={s.href} target={s.href.startsWith('http') ? '_blank' : '_self'} rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    <span className="social-icon" aria-hidden="true">{s.icon}</span>
                    <span className="social-label">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Policies */}
          <nav className="footer-col legal-col" aria-label="Legal and policies">
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-links">
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/data-handling">Data Handling</Link></li>
              <li><Link to="/acceptable-use">Acceptable Use</Link></li>
              <li><Link to="/cookies">Cookies Notice</Link></li>
              <li><Link to="/disclaimer">Disclaimer</Link></li>
            </ul>
          </nav>
        </div>
        <div className="footer-bottom">
          <p className="copyright">© {year} FixDQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default GlobalFooter;
