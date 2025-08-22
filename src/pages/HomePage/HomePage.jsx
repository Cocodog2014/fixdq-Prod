import GlobalHeader from '../../components/GlobalHeader';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="app">
      <GlobalHeader />

      {/* Features Grid (six flash cards, FMCSA Compliance first) */}
      <section className="features-grid">
        <div className="container">
          <div className="grid">
            {/* Getting Started (new) */}
            <Link to="/getting-started" className="feature-card orange-border feature-link-card">
              <div className="feature-header">
                <span className="icon">🚀</span>
                <h3>Getting Started</h3>
              </div>
              <ul>
                <li>Pick Driver / Carrier / Broker</li>
                <li>Step-by-step action list</li>
                <li>CDL & ELDT helpers</li>
                <li>Medical & endorsement links</li>
                <li>Fast path overview</li>
              </ul>
              <div className="feature-footer">
                <span className="card-cta">Open Getting Started</span>
              </div>
            </Link>
            {/* FMCSA Compliance (card is fully clickable) */}
            <Link to="/fmcsa-compliance" className="feature-card orange-border feature-link-card">
              <div className="feature-header">
                <span className="icon">📋</span>
                <h3>FMCSA Compliance</h3>
              </div>
              <ul>
                <li>Federal Motor Carrier Safety Regulations</li>
                <li>Hours of Service (HOS) Rules</li>
                <li>Safety Management Cycles</li>
                <li>Compliance, Safety, Accountability (CSA)</li>
                <li>Violation Prevention & Management</li>
              </ul>
              <div className="feature-footer">
                <span className="card-cta">Open FMCSA Page</span>
              </div>
            </Link>

            {/* ELD & Logbook Coach */}
            <Link to="/eld-coach?roadmap=1" className="feature-card orange-border feature-link-card">
              <div className="feature-header">
                <span className="icon">📟</span>
                <h3>ELD & Logbook Coach</h3>
              </div>
              <ul>
                <li>Setup Wizard & Daily Start</li>
                <li>Duty Controller with PC/YM</li>
                <li>Risk Scanner (false logs)</li>
                <li>Transfer & Roadside drill</li>
                <li>Malfunction steps & paper logs</li>
              </ul>
              <div className="feature-footer">
                <span className="card-cta">Open ELD Coach</span>
              </div>
            </Link>

            {/* Records of Duty Status (RDS) */}
            <Link to="/records-of-duty" className="feature-card purple-border feature-link-card">
              <div className="feature-header">
                <span className="icon">🕒</span>
                <h3>Records of Duty Status</h3>
              </div>
              <ul>
                <li>ELD vs Paper: who must use which</li>
                <li>Allowed and not allowed scenarios</li>
                <li>Short-haul exceptions</li>
                <li>ELD malfunction temporary paper rules</li>
                <li>Pre-2000 vehicle exemptions</li>
              </ul>
              <div className="feature-footer">
                <span className="card-cta">Open RDS Guide</span>
              </div>
            </Link>

            {/* Vehicle Inspections */}
            <Link to="/vehicle-inspections" className="feature-card blue-border feature-link-card">
              <div className="feature-header">
                <span className="icon">❓</span>
                <h3>Vehicle Inspections</h3>
              </div>
              <ul>
                <li>Pre-Trip Inspection Procedures</li>
                <li>Post-Trip Inspection Reports</li>
                <li>DOT Roadside Inspections</li>
                <li>Driver Vehicle Inspection Report (DVIR)</li>
                <li>Maintenance & Repair Documentation</li>
              </ul>
              <div className="feature-footer">
                <span className="card-cta">Open Vehicle Inspections</span>
              </div>
            </Link>

            {/* US Citizenship for Truckers (link to same URL as header button) */}
            <a href="https://citizenship360.org" className="feature-card red-border feature-link-card">
              <div className="feature-header">
                <span className="icon">🇺🇸</span>
                <h3>US Citizenship for Truckers</h3>
              </div>
              <ul>
                <li>Flexible Study Schedule</li>
                <li>Audio Lessons for the Road</li>
                <li>Offline Study Materials</li>
                <li>Rest Stop Study Sessions</li>
                <li>Mobile-Friendly Practice Tests</li>
              </ul>
              <div className="feature-footer">
                <span className="card-cta">Open US Citizenship</span>
              </div>
            </a>

            {/* Safety Training (full-card link, matches header link) */}
            <Link to="/safety-training" className="feature-card green-border feature-link-card">
              <div className="feature-header">
                <span className="icon">🛡️</span>
                <h3>Safety Training</h3>
              </div>
              <ul>
                <li>Defensive Driving Techniques</li>
                <li>Hazmat Transportation</li>
                <li>Weather & Road Conditions</li>
                <li>Emergency Procedures</li>
                <li>Accident Prevention</li>
              </ul>
              <div className="feature-footer">
                <span className="card-cta">Open Safety Training</span>
              </div>
            </Link>

            {/* Violations Management (full-card link + bottom CTA) */}
            <Link to="/violations-management" className="feature-card teal-border feature-link-card">
              <div className="feature-header">
                <span className="icon">⚖️</span>
                <h3>Violations Management</h3>
              </div>
              <ul>
                <li>Understanding Citation Types</li>
                <li>DataQ System Navigation</li>
                <li>Driver Score Improvement</li>
                <li>Appeal Process Guidelines</li>
                <li>Record Maintenance</li>
              </ul>
              <div className="feature-footer">
                <span className="card-cta">Open Violations Management</span>
              </div>
            </Link>

            {/* English Proficiency */}
            <Link to="/english-proficiency" className="feature-card red-border feature-link-card">
              <div className="feature-header">
                <span className="icon">🗣️</span>
                <h3>English Proficiency</h3>
              </div>
              <ul>
                <li>Roadside interview practice</li>
                <li>Common safety phrases & questions</li>
                <li>Reading signs and paperwork</li>
                <li>ELD notes & clear communication</li>
                <li>Study flashcards (coming soon)</li>
              </ul>
              <div className="feature-footer">
                <span className="card-cta">Study English</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* State Permits + IFTA (now underneath flash cards) */}
      <section className="permits-ifta">
        <div className="container">
          <h2>Permits and IFTA</h2>
          <div className="grid">
            <div className="feature-card blue-border">
              <div className="feature-header">
                <span className="icon">�️</span>
                <h3>State Permits</h3>
              </div>
              <ul>
                <li>Oversize/Overweight permits by state</li>
                <li>Trip and fuel permits (temporary)</li>
                <li>Tolling and transponder setup</li>
                <li>IRP registration basics</li>
                <li>Port-of-entry requirements</li>
              </ul>
            </div>
            <div className="feature-card green-border">
              <div className="feature-header">
                <span className="icon">⛽</span>
                <h3>IFTA (International Fuel Tax Agreement)</h3>
              </div>
              <ul>
                <li>Quarterly filing timelines</li>
                <li>Miles and fuel recordkeeping</li>
                <li>Jurisdiction rate lookup</li>
                <li>Common audit triggers</li>
                <li>Best practices to stay compliant</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose">
        <div className="container">
          <h2>Why Choose Our Commercial Drivers Platform?</h2>
          <div className="benefits-grid">
            <div className="benefit">
              <span className="benefit-icon">📱</span>
              <h4>Mobile-First Design</h4>
              <p>Study anywhere, anytime - perfect for rest stops, loading docks, and downtime between runs.</p>
            </div>
            <div className="benefit">
              <span className="benefit-icon">🎧</span>
              <h4>Audio Learning</h4>
              <p>Listen while driving (during legal breaks) or use hands-free study methods designed for truckers.</p>
            </div>
            <div className="benefit">
              <span className="benefit-icon">📶</span>
              <h4>Offline Access</h4>
              <p>Download content for areas with poor cell coverage. No internet? No problem!</p>
            </div>
            <div className="benefit">
              <span className="benefit-icon">�</span>
              <h4>Industry Expertise</h4>
              <p>Content developed by experienced drivers and FMCSA compliance experts.</p>
            </div>
            <div className="benefit">
              <span className="benefit-icon">⏰</span>
              <h4>Flexible Scheduling</h4>
              <p>Learn at your own pace between runs, during mandatory rest periods, and on your schedule.</p>
            </div>
            <div className="benefit">
              <span className="benefit-icon">📊</span>
              <h4>Progress Tracking</h4>
              <p>Monitor your learning progress and compliance status with detailed analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access */}
      <section className="early-access">
        <div className="container">
          <div className="early-access-content">
            <h2>Get Early Access</h2>
            <p>Be among the first to access our commercial drivers platform when it launches.</p>
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-icon">🎯</span>
                <span>Free beta access</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">💰</span>
                <span>Launch discount pricing</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">📢</span>
                <span>Development updates</span>
              </div>
            </div>
            <div className="email-signup">
              <input type="email" placeholder="Enter your email address" />
              <button className="notify-btn">Notify Me</button>
            </div>
            <p className="privacy-notice">We respect your privacy. No spam, just important updates about the platform launch.</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact">
        <div className="container">
          <h2>Have Questions or Suggestions?</h2>
          <p>We're building this platform for drivers, by drivers. Your input matters!</p>
          <div className="contact-options">
            <div className="contact-option">
              <span className="contact-icon">📧</span>
              <h4>Email Us</h4>
              <p>Send us your ideas, suggestions, or questions about the upcoming platform.</p>
              <a href="mailto:drivers@citizenship360.com">drivers@citizenship360.com</a>
            </div>
            <div className="contact-option">
              <span className="contact-icon">💬</span>
              <h4>Join the Community</h4>
              <p>Connect with other drivers and stay updated on our progress.</p>
              <button className="community-btn">Join Our Forum (Coming Soon)</button>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section (now at the bottom) */}
      <section className="coming-soon">
        <div className="container">
          <div className="coming-soon-header">
            <span className="truck-icon">🚚</span>
            <h2>What's Coming Soon</h2>
          </div>
          <p>Comprehensive training and compliance tools designed specifically for professional drivers</p>
          <p>
            Explore our new{' '}
            <a href="/fmcsa-compliance#flowchart">FMCSA Compliance flowchart</a>{' '}
            to quickly determine your CDL class and endorsements.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="truck-icons">
              <span>🚛</span>
              <span>🚚</span>
              <span>🚛</span>
            </div>
            <h3>Built for the Road Warriors</h3>
            <p>Professional drivers keep America moving. We're building tools to keep you compliant, safe, and successful on the road.</p>
            <div className="tagline">"Keep on truckin' - we've got your back!"</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
