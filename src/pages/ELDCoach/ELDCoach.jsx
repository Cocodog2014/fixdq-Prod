import GlobalHeader from '../../components/GlobalHeader';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useCallback } from 'react';
import RoadmapModal from './RoadmapModal';

function ELDCoach() {
  const location = useLocation();
  const navigate = useNavigate();
  const showRoadmap = useMemo(() => new URLSearchParams(location.search).get('roadmap') === '1', [location.search]);
  const closeRoadmap = useCallback(() => {
    const params = new URLSearchParams(location.search);
    params.delete('roadmap');
    navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
  }, [location.pathname, location.search, navigate]);

  return (
    <div className="eld-coach app">
      <GlobalHeader />

      <section className="eld-hero">
        <div className="container">
          <h1>ELD & Logbook Coach</h1>
          <p className="subtitle">Mobile-first practice and coaching to avoid false logs and pass roadside</p>

          <div className="quick-actions">
            <Link className="btn" to="/eld-coach/device">Open Device</Link>
            <Link className="btn" to="/eld-coach/setup">Setup Wizard</Link>
            <Link className="btn" to="/eld-coach/day-start">Daily Start</Link>
            <Link className="btn" to="/eld-coach/status">Duty Controller</Link>
            <Link className="btn" to="/eld-coach/risk">Risk Scanner</Link>
            <Link className="btn" to="/eld-coach/transfer">Transfer & Roadside</Link>
            <Link className="btn" to="/eld-coach/malfunction">Malfunction</Link>
            <Link className="btn" to="/eld-coach/lessons">Lessons</Link>
          </div>
        </div>
      </section>

      <section className="eld-modules">
        <div className="container">
          <div className="grid">
            <Link to="/eld-coach/setup" className="module-card blue-border feature-link-card">
              <div className="feature-header"><span className="icon">🧭</span><h3>Setup Wizard</h3></div>
              <ul>
                <li>Driver, carrier, home terminal & timezone</li>
                <li>Cycle 60/70, property vs passenger</li>
                <li>Vehicle/trailer defaults & exceptions</li>
                <li>Download instruction packet</li>
              </ul>
              <div className="feature-footer"><span className="card-cta">Open Setup</span></div>
            </Link>

            <Link to="/eld-coach/day-start" className="module-card green-border feature-link-card">
              <div className="feature-header"><span className="icon">📅</span><h3>Daily Start</h3></div>
              <ul>
                <li>Vehicle & trailer IDs</li>
                <li>BOL/shipping doc #</li>
                <li>Odometer & start location</li>
              </ul>
              <div className="feature-footer"><span className="card-cta">Start Day</span></div>
            </Link>

            <Link to="/eld-coach/status" className="module-card orange-border feature-link-card">
              <div className="feature-header"><span className="icon">⏱️</span><h3>Duty Controller</h3></div>
              <ul>
                <li>OFF, SB, ON, DRIVE</li>
                <li>PC & YM toggles</li>
                <li>Inline rule prompts</li>
              </ul>
              <div className="feature-footer"><span className="card-cta">Open Controller</span></div>
            </Link>

            <Link to="/eld-coach/risk" className="module-card red-border feature-link-card">
              <div className="feature-header"><span className="icon">🔎</span><h3>Risk Scanner</h3></div>
              <ul>
                <li>Uncertified logs</li>
                <li>Missing BOL / location</li>
                <li>Break & cycle checks (basic)</li>
              </ul>
              <div className="feature-footer"><span className="card-cta">Scan Risks</span></div>
            </Link>

            <Link to="/eld-coach/transfer" className="module-card teal-border feature-link-card">
              <div className="feature-header"><span className="icon">📤</span><h3>Transfer & Roadside</h3></div>
              <ul>
                <li>Instruction packet</li>
                <li>Last 7/8 days preview</li>
                <li>Transfer tutorial</li>
              </ul>
              <div className="feature-footer"><span className="card-cta">Open Transfer</span></div>
            </Link>

            <Link to="/eld-coach/malfunction" className="module-card purple-border feature-link-card">
              <div className="feature-header"><span className="icon">🚧</span><h3>Malfunction</h3></div>
              <ul>
                <li>Steps & notifications</li>
                <li>8 days paper fallback</li>
                <li>Printable paper log</li>
              </ul>
              <div className="feature-footer"><span className="card-cta">Open Malfunction</span></div>
            </Link>

            <Link to="/eld-coach/lessons" className="module-card blue-border feature-link-card">
              <div className="feature-header"><span className="icon">🎓</span><h3>Lessons</h3></div>
              <ul>
                <li>PC vs YM</li>
                <li>Edits & annotations</li>
                <li>Split sleeper basics</li>
              </ul>
              <div className="feature-footer"><span className="card-cta">Open Lessons</span></div>
            </Link>
          </div>
        </div>
      </section>
  <RoadmapModal open={showRoadmap} onClose={closeRoadmap} />
    </div>
  );
}

export default ELDCoach;
