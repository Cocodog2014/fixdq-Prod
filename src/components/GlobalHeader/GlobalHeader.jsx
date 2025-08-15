import { useState, useEffect } from 'react';
import fixdqLogo from '../../assets/logos/fixdq.png';
import { Link, useLocation } from 'react-router-dom';

function GlobalHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const location = useLocation();

  // Ten rotating mobile hero title/subtitle pairs
  const heroSlides = [
    { title: 'Keep Your Fleet Compliant', subtitle: 'Stay audit‑ready with proactive FMCSA monitoring.' },
    { title: 'Pass Every DOT Inspection', subtitle: 'Tight records, clean vehicles, confident drivers.' },
    { title: 'ELD Made Easy', subtitle: 'Simple, accurate electronic logs with zero guesswork.' },
    { title: 'Prevent Costly Violations', subtitle: 'Spot risks early and fix issues before they escalate.' },
    { title: 'Safer Drivers, Safer Roads', subtitle: 'Training and tools that build everyday safety habits.' },
    { title: 'Manage DVIRs in Minutes', subtitle: 'Fast, consistent vehicle checks—no paperwork pileups.' },
    { title: 'Roadside Ready, Anytime', subtitle: 'Organized docs and processes when it matters most.' },
    { title: 'Build a Safety Culture', subtitle: 'Make compliance part of how your team operates.' },
    { title: 'Navigate USCIS Confidently', subtitle: 'Guidance for forms, timelines, and approvals.' },
    { title: 'FixDQ: Compliance, Simplified', subtitle: 'One place to manage people, paperwork, and policies.' }
  ];

  // Rotate slide every 6 seconds (mobile-first content)
  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Unified list of all nav buttons (desktop + mobile)
  const navigationItems = [
    { label: 'Home', href: '/', color: 'blue', icon: '🏠' },
    { label: 'Electronic Logbooks', href: '/electronic-logbooks', color: 'purple', icon: '📖' },
    { label: 'Vehicle Inspections', href: '/vehicle-inspections', color: 'blue', icon: '🔍' },
    { label: 'US Citizenship', href: 'https://citizenship360.org', color: 'red', icon: '🇺🇸' },
    { label: 'Safety Training', href: '/safety-training', color: 'green', icon: '🛡️' },
    { label: 'Violations Management', href: '/violations-management', color: 'teal', icon: '⚖️' }
  ];

  return (
    <header className="global-header">
      {/* Top Header Banner */}
      <div className="header-banner">
        <div className="container">
          <div className="header-content">
            {/* Logo Section */}
            <div className="logo-section">
              <a href="/" className="logo-link" rel="noopener noreferrer">
                <img className="logo-image" src={fixdqLogo} alt="FixDQ logo" />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="desktop-nav">
              <div className="nav-grid">
                {navigationItems.map((item, index) => (
                  item.href.startsWith('http') ? (
                  <a 
                    key={index}
                    href={item.href} 
                    className={`nav-button nav-${item.color}`}
          target={item.href.startsWith('http') && item.label !== 'US Citizenship' ? '_blank' : '_self'}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </a>
                  ) : (
                  <Link
                    key={index}
                    to={item.href}
                    className={`nav-button nav-${item.color}`}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </Link>
                  )
                ))}
              </div>
            </nav>

            {/* Mobile Hamburger Button */}
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </div>

  {/* Mobile Navigation Menu */}
      <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="container">
          <div className="mobile-nav-grid">
  {navigationItems.map((item, index) => (
              item.href.startsWith('http') ? (
              <a 
                key={index}
                href={item.href} 
                className={`mobile-nav-button nav-${item.color}`}
        target={item.href.startsWith('http') && item.label !== 'US Citizenship' ? '_blank' : '_self'}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </a>
              ) : (
              <Link
                key={index}
                to={item.href}
                className={`mobile-nav-button nav-${item.color}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
              )
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="container">
          {/* Mobile-only logo + hamburger inside the hero */}
          <div className="hero-mobile-controls">
            <a href="/" className="hero-logo-link" rel="noopener noreferrer">
              <img className="hero-logo-image" src={fixdqLogo} alt="FixDQ logo" />
            </a>
            <button 
              className="hero-mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
          <div className="hero-content">
            {/* Mobile-only rotating titles/subtitles */}
            <div className="hero-rotator" aria-live="polite">
              <div className="hero-rotator-slide" key={slideIndex}>
                <h2>{heroSlides[slideIndex].title}</h2>
                <p>{heroSlides[slideIndex].subtitle}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Moving ribbon at the bottom of the hero */}
        <div className="hero-ribbon" aria-label="Site topics marquee">
          <div className="ribbon-viewport">
            <div className="ribbon-track" aria-hidden="true">
              <span className="ribbon-item">FMCSA Compliance</span>
              <span className="ribbon-sep">•</span>
              <span className="ribbon-item">Electronic Logbooks</span>
              <span className="ribbon-sep">•</span>
              <span className="ribbon-item">Vehicle Inspections</span>
              <span className="ribbon-sep">•</span>
              <span className="ribbon-item">US Citizenship</span>
              <span className="ribbon-sep">•</span>
              <span className="ribbon-item">Safety Training</span>
              <span className="ribbon-sep">•</span>
              <span className="ribbon-item">Violations Management</span>

              {/* Duplicate for seamless loop */}
              <span className="ribbon-item">FMCSA Compliance</span>
              <span className="ribbon-sep">•</span>
              <span className="ribbon-item">Electronic Logbooks</span>
              <span className="ribbon-sep">•</span>
              <span className="ribbon-item">Vehicle Inspections</span>
              <span className="ribbon-sep">•</span>
              <span className="ribbon-item">US Citizenship</span>
              <span className="ribbon-sep">•</span>
              <span className="ribbon-item">Safety Training</span>
              <span className="ribbon-sep">•</span>
              <span className="ribbon-item">Violations Management</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default GlobalHeader;
