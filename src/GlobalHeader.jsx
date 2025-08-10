import { useState } from 'react';

function GlobalHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { label: 'FMCSA Compliance', href: '/fmcsa-compliance', color: 'orange', icon: '📋' },
    { label: 'Electronic Logbooks', href: '/electronic-logbooks', color: 'purple', icon: '📖' },
    { label: 'Vehicle Inspections', href: '/vehicle-inspections', color: 'blue', icon: '🔍' },
    { label: 'US Citizenship', href: '/us-citizenship', color: 'red', icon: '🇺🇸' },
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
              <a href="/" className="logo-link">
                <span className="logo-icon">🚛</span>
                <div className="logo-text">
                  <h1>FixDQ</h1>
                  <span className="logo-subtitle">Commercial Drivers Hub</span>
                </div>
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="desktop-nav">
              <div className="nav-grid">
                {navigationItems.map((item, index) => (
                  <a 
                    key={index}
                    href={item.href} 
                    className={`nav-button nav-${item.color}`}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </a>
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
              <a 
                key={index}
                href={item.href} 
                className={`mobile-nav-button nav-${item.color}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="container">
          <div className="hero-content">
            <h2>Professional Development & Compliance Training</h2>
            <p>Comprehensive tools designed specifically for commercial drivers</p>
            <div className="hero-cta">
              <button className="cta-primary">Get Started</button>
              <button className="cta-secondary">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default GlobalHeader;
