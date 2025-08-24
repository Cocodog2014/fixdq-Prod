import { useState, useEffect, Fragment } from 'react';
import fixdqLogo from '../../assets/logos/fixdqb.png';
import { Link, useLocation } from 'react-router-dom';
import heroSlides from './data/banner/slides.js';
import ribbonItems from './data/ribbon/items.js';

function GlobalHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const location = useLocation();

  // heroSlides imported from ./data/banner/slides.js

  // Rotate slide every 6 seconds (mobile-first content)
  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  // Accent color order matches header button palette
  const accentOrder = ['orange', 'purple', 'blue', 'red', 'green', 'teal'];
  const currentAccent = accentOrder[slideIndex % accentOrder.length];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Unified list of all nav buttons (desktop + mobile)
  const navigationItems = [
    { label: 'Who is FixDQ', href: '/about', color: 'orange', icon: 'ℹ️' },
    { label: 'Home', href: '/', color: 'blue', icon: '🏠' },
    // Add ?roadmap=1 so clicking opens modal on /eld-coach
    { label: 'Electronic Logbooks', href: '/eld-coach?roadmap=1', color: 'purple', icon: '📖' },
    { label: 'Vehicle Inspections', href: '/vehicle-inspections', color: 'blue', icon: '🔍' },
    { label: 'US Citizenship', href: 'https://citizenship360.org', color: 'red', icon: '🇺🇸' },
    { label: 'Safety Training', href: '/safety-training', color: 'green', icon: '🛡️' },
  { label: 'Violations Management', href: '/violations-management', color: 'teal', icon: '⚖️' },
  { label: 'Frequently Asked Questions', href: '/faq', color: 'orange', icon: '❓' },
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
              <div className={`hero-rotator-slide accent-${currentAccent}`} key={slideIndex}>
                <h2>{heroSlides[slideIndex].title}</h2>
                <p className="slide-subtitle">{heroSlides[slideIndex].subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  {/* Header bottom moving ribbon */}
          <div className="header-ribbon" aria-label="Site topics marquee">
            <div className="ribbon-viewport">
              <div className="ribbon-track" aria-hidden="true">
                {ribbonItems.map((label, idx) => (
                  <Fragment key={idx}>
                    <span className="ribbon-item">{label}</span>
                    {idx < ribbonItems.length - 1 && <span className="ribbon-sep">•</span>}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
    </header>
  );
}

export default GlobalHeader;
