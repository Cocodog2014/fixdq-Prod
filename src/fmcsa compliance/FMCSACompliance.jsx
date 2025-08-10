import './FMCSACompliance.css';
import GlobalHeader from '../GlobalHeader.jsx';

function FMCSACompliance() {
  return (
    <div className="fmcsa-page">
      <GlobalHeader />
      <section className="fmcsa-hero">
        <div className="container">
          <div className="hero-inner">
            <span className="hero-icon" role="img" aria-label="clipboard">📋</span>
            <h1>FMCSA Compliance</h1>
            <p>Essential regulations, Hours of Service, CSA, inspections, and violation prevention for commercial drivers.</p>
          </div>
        </div>
      </section>

      <section className="fmcsa-cards">
        <div className="container">
          <div className="cards-grid">
            <div className="card">
              <h3>FMCSR Overview</h3>
              <p>Understand key parts of the Federal Motor Carrier Safety Regulations that affect your daily operations.</p>
            </div>
            <div className="card">
              <h3>Hours of Service (HOS)</h3>
              <p>Rules, exemptions, and best practices to avoid common HOS violations and stay compliant.</p>
            </div>
            <div className="card">
              <h3>CSA & Safety Scores</h3>
              <p>How CSA works, SMS basics, and actions to protect and improve your safety profile.</p>
            </div>
            <div className="card">
              <h3>Inspections & DVIR</h3>
              <p>Pre/Post-trip inspections, roadside inspections, and proper DVIR documentation.</p>
            </div>
            <div className="card emphasis">
              <h3>Quick Start</h3>
              <p>Use this checklist to get compliant fast. Ideal as a splash card for onboarding.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FMCSACompliance;
