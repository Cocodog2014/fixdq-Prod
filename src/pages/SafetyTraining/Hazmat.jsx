import GlobalHeader from '../../components/GlobalHeader';
import { Link } from 'react-router-dom';

export default function Hazmat() {
  const modules = [
    { key: 'intro-classes', title: 'Intro & Classes', emoji: '🧪', accent: 'orange' },
    { key: 'segregation-loading', title: 'Segregation & Loading', emoji: '📦', accent: 'purple' },
    { key: 'route-parking', title: 'Route & Parking Restrictions', emoji: '🛣️', accent: 'blue' },
    { key: 'incident-response', title: 'Incident Response Basics', emoji: '🚒', accent: 'red' },
    { key: 'docs-inspections', title: 'Docs & Inspections', emoji: '📄', accent: 'teal' },
  ];

  return (
    <div className="app hazmat-page">
      <GlobalHeader />
      <section className="section-padding">
        <div className="container">
          <div className="hz-header">
            <span className="hz-icon" aria-hidden>☢️</span>
            <h1 id="hz-title">Hazmat Transportation</h1>
          </div>
          <p className="hz-sub">Choose a module to explore. Modules are being built out.</p>

          <section className="hz-grid" aria-labelledby="hz-title">
            {modules.map((m) => (
              <div key={m.key} className={`hz-card hz-tile tile-${m.accent}`} role="region" aria-label={m.title}>
                <div className={`hz-rail rail-${m.accent}`} aria-hidden></div>
                <div className="hz-body">
                  <div className="hz-emoji" aria-hidden>{m.emoji}</div>
                  <h2 className="hz-title">{m.title}</h2>
                  <p className="hz-note">Coming soon</p>
                </div>
              </div>
            ))}
          </section>

          <div className="hz-actions">
            <Link to="/safety-training" className="btn-link">← Back to Safety Training</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
