import GlobalHeader from '../../components/GlobalHeader';
import { Link } from 'react-router-dom';

export default function EmergencyProcedures() {
  const modules = [
    { key: 'immediate-actions', title: 'Immediate Actions', emoji: '🚨', accent: 'red' },
    { key: 'fire-basics', title: 'Fire Basics', emoji: '🔥', accent: 'orange' },
    { key: 'medical-emergencies', title: 'Medical Emergencies', emoji: '🩺', accent: 'purple' },
    { key: 'breakdowns', title: 'Breakdowns', emoji: '🛠️', accent: 'teal' },
    { key: 'reporting-docs', title: 'Reporting & Documentation', emoji: '📝', accent: 'blue' },
  ];

  return (
    <div className="app emergency-procedures-page">
      <GlobalHeader />
      <section className="section-padding">
        <div className="container">
          <div className="ep-header">
            <span className="ep-icon" aria-hidden>🔔</span>
            <h1 id="ep-title">Emergency Procedures</h1>
          </div>
          <p className="ep-sub">Choose a module to explore. Modules are being built out.</p>

          <section className="ep-grid" aria-labelledby="ep-title">
            {modules.map((m) => (
              <div key={m.key} className={`ep-card ep-tile tile-${m.accent}`} role="region" aria-label={m.title}>
                <div className={`ep-rail rail-${m.accent}`} aria-hidden></div>
                <div className="ep-body">
                  <div className="ep-emoji" aria-hidden>{m.emoji}</div>
                  <h2 className="ep-title">{m.title}</h2>
                  <p className="ep-note">Coming soon</p>
                </div>
              </div>
            ))}
          </section>

          <div className="ep-actions">
            <Link to="/safety-training" className="btn-link">← Back to Safety Training</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
