import GlobalHeader from '../../components/GlobalHeader';
import { Link } from 'react-router-dom';

export default function ViolationManagement() {
  const modules = [
    { key: 'citation-types', title: 'Understanding Citation Types', emoji: '⚖️', accent: 'teal' },
    { key: 'dataq-navigation', title: 'DataQ System Navigation', emoji: '🧭', accent: 'purple' },
    { key: 'driver-score', title: 'Driver Score Improvement', emoji: '📈', accent: 'orange' },
    { key: 'most-common', title: 'Most Common Violations', emoji: '📌', accent: 'green', note: 'Impact on safety score + how to fix (bullets)' },
    { key: 'appeal-process', title: 'Appeal Process Guidelines', emoji: '📑', accent: 'blue' },
    { key: 'record-maintenance', title: 'Record Maintenance', emoji: '🗂️', accent: 'red' },
  ];

  return (
    <div className="app violation-management-page">
      <GlobalHeader />
      <section className="section-padding">
        <div className="container">
          <div className="vm-header">
            <span className="vm-icon" aria-hidden>⚖️</span>
            <h1 id="vm-title">Violations Management</h1>
          </div>
          <p className="vm-sub">Choose a module to explore. Modules are being built out.</p>

          <section className="vm-grid" aria-labelledby="vm-title">
            {modules.map((m) => {
              const isLink = m.key !== 'record-maintenance';
              const to = `/violations-management/${m.key}`;
              const CardInner = (
                <>
                  <div className={`vm-rail rail-${m.accent}`} aria-hidden></div>
                  <div className="vm-body">
                    <div className="vm-emoji" aria-hidden>{m.emoji}</div>
                    <h2 className="vm-title">{m.title}</h2>
                    <p className="vm-note">{m.note || 'Coming soon'}</p>
                  </div>
                </>
              );

              return isLink ? (
                <Link key={m.key} to={to} className={`vm-card vm-tile tile-${m.accent}`} aria-label={m.title}>
                  {CardInner}
                </Link>
              ) : (
                <div key={m.key} className={`vm-card vm-tile tile-${m.accent}`} role="region" aria-label={m.title}>
                  {CardInner}
                </div>
              );
            })}
          </section>

          <div className="vm-actions">
            <Link to="/" className="btn-link">← Back to Home</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
