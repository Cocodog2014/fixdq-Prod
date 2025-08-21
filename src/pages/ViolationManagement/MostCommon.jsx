import GlobalHeader from '../../components/GlobalHeader';
import { Link } from 'react-router-dom';

export default function MostCommonViolations() {
  const bullets = [
    {
      title: 'Logbook/ELD Errors',
      impact: 'High CSA impact in HOS BASIC; repeats tank your score fast.',
      fix: 'Coach recap planning, verify device mounting/usage, and add weekly audits.'
    },
    {
      title: 'Lighting and Reflectors',
      impact: 'Moderate impact but very frequent — lots of points through volume.',
      fix: '10‑minute light check at each stop; carry spare bulbs/fuses.'
    },
    {
      title: 'Tires and Brakes (obvious defects)',
      impact: 'Severe when OOS; spikes Vehicle Maintenance BASIC.',
      fix: 'Daily DVIR with tread/air checks; don’t roll with audible leaks or exposed ply.'
    },
    {
      title: 'Cargo Securement',
      impact: 'High when load can shift/fall; quick CSA hits and OOS risk.',
      fix: 'Use rated tie‑downs, no knots, re‑check at duty changes and 150 miles.'
    },
    {
      title: 'Driver Qualifications/Docs',
      impact: 'Severe (CDL/Medical/Disqualified) and often leads to OOS.',
      fix: 'Monthly DQ file audits; keep med card, license class/endorsements current.'
    }
  ];

  return (
    <div className="app violation-management-page most-common-page">
      <GlobalHeader />
      <section className="section-padding">
        <div className="container">
          <div className="vm-header">
            <span className="vm-icon" aria-hidden>📌</span>
            <h1 id="mc-title">Most Common Violations</h1>
          </div>
          <p className="vm-sub">How they affect your safety score — and how to fix them.</p>

          <div className="mc-card vm-card vm-tile tile-green" role="region" aria-labelledby="mc-title">
            <div className="vm-rail rail-green" aria-hidden></div>
            <div className="vm-body">
              <ul className="mc-list">
                {bullets.map((b, i) => (
                  <li key={i} className="mc-item">
                    <h3 className="mc-item-title">{b.title}</h3>
                    <p className="mc-item-impact"><strong>Impact:</strong> {b.impact}</p>
                    <p className="mc-item-fix"><strong>How to fix:</strong> {b.fix}</p>
                  </li>
                ))}
              </ul>
              <p className="vm-note">Perfect for toolbox talks. Start with quick wins: lights, paperwork, mounts, and DVIR habits.</p>
            </div>
          </div>

          <div className="vm-actions">
            <Link to="/violations-management" className="btn-link">← Back to Violations Management</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
