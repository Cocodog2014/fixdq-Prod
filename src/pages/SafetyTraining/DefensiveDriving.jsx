import GlobalHeader from '../../components/GlobalHeader';
import { Link } from 'react-router-dom';

export default function DefensiveDriving() {
  const lessons = [
  { key: 'scan-space', title: 'Scan & Space', accent: 'orange', emoji: '👀' },
  { key: 'speed-following', title: 'Speed & Following Distance', accent: 'purple', emoji: '🚗💨' },
  { key: 'high-risk-zones', title: 'High-Risk Zones', accent: 'blue', emoji: '⚠️' },
  { key: 'incident-avoidance', title: 'Incident Avoidance & Recovery', accent: 'red', emoji: '🛑' },
  { key: 'night-fatigue', title: 'Night & Fatigue (optional)', accent: 'teal', emoji: '🌙' },
  ];

  return (
    <div className="app defensive-driving-page">
      <GlobalHeader />
      <section className="section-padding">
        <div className="container">
          <div className="dd-header">
            <span className="dd-icon" aria-hidden>🛣️</span>
            <h1 id="dd-title">Defensive Driving Techniques</h1>
          </div>
          <p className="dd-sub">Choose a module to explore. Modules are being built out.</p>

          <section className="dd-grid" aria-labelledby="dd-title">
            {lessons.map((l) => (
              <div key={l.key} className={`dd-card dd-tile tile-${l.accent}`} role="region" aria-label={l.title}>
                <div className={`dd-rail rail-${l.accent}`} aria-hidden></div>
                <div className="dd-body">
                  <div className="dd-emoji" aria-hidden>{l.emoji}</div>
                  <h2 className="dd-title">{l.title}</h2>
                  <p className="dd-note">Coming soon</p>
                </div>
              </div>
            ))}
          </section>

          <div className="dd-actions">
            <Link to="/safety-training" className="btn-link">← Back to Safety Training</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
