import GlobalHeader from '../../components/GlobalHeader';
import { Link } from 'react-router-dom';

export default function AccidentPrevention() {
  const modules = [
    { key: 'top-violations', title: 'Top FMCSA Violations', emoji: '📋', accent: 'orange' },
    { key: 'backing-yard', title: 'Backing & Yard Safety', emoji: '🚧', accent: 'purple' },
    { key: 'load-securement', title: 'Load Securement Basics', emoji: '🧷', accent: 'blue' },
    { key: 'fatigue-scheduling', title: 'Fatigue & Scheduling', emoji: '⏰', accent: 'red' },
    { key: 'near-miss', title: 'Near-Miss Program', emoji: '🛡️', accent: 'teal' },
  ];

  return (
    <div className="app accident-prevention-page">
      <GlobalHeader />
      <section className="section-padding">
        <div className="container">
          <div className="ap-header">
            <span className="ap-icon" aria-hidden>🛡️</span>
            <h1 id="ap-title">Accident Prevention</h1>
          </div>
          <p className="ap-sub">Choose a module to explore. Modules are being built out.</p>

          <section className="ap-grid" aria-labelledby="ap-title">
            {modules.map((m) => (
              <div key={m.key} className={`ap-card ap-tile tile-${m.accent}`} role="region" aria-label={m.title}>
                <div className={`ap-rail rail-${m.accent}`} aria-hidden></div>
                <div className="ap-body">
                  <div className="ap-emoji" aria-hidden>{m.emoji}</div>
                  <h2 className="ap-title">{m.title}</h2>
                  <p className="ap-note">Coming soon</p>
                </div>
              </div>
            ))}
          </section>

          <div className="ap-actions">
            <Link to="/safety-training" className="btn-link">← Back to Safety Training</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
