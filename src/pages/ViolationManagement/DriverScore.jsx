import GlobalHeader from '../../components/GlobalHeader';
import { Link } from 'react-router-dom';

export default function DriverScore() {
  const modules = [
    {
      id: 'DS-301',
      key: 'csa-works',
      title: 'How CSA Works (Carrier View)',
      promise: 'From violations to BASIC percentiles—what really moves your score.',
      emoji: '🏢',
      accent: 'orange',
      flash: 'Ticket vs inspection: which affects CSA? • What makes a violation weigh more? • What increases roadside targeting?',
      link: '/violations-management/citation-types', // cross-link
    },
    {
      id: 'DS-302',
      key: 'psp-driver',
      title: 'PSP & the Driver’s Record',
      promise: 'Your roadside history and how to keep it clean.',
      emoji: '🧾',
      accent: 'purple',
      flash: 'What shows in PSP vs MVR? • Do dismissed tickets change PSP automatically?',
      link: '/violations-management/dataq-navigation', // cross-link to DataQs
    },
    {
      id: 'DS-303',
      key: 'mvr-insurance',
      title: 'MVR, Insurance & Company Risk',
      promise: 'Tickets hit MVR; inspections hit CSA. Handle both.',
      emoji: '🛡️',
      accent: 'blue',
      flash: 'Speeding ticket without an inspection—CSA impact? • Why insurers care about both MVR and CSA? • When to also file DataQs.',
    },
    {
      id: 'DS-304',
      key: 'iss-selection',
      title: 'Inspection Selection & Audits (ISS)',
      promise: 'High scores = more pull-ins. Break the cycle.',
      emoji: '🚧',
      accent: 'red',
      flash: 'Which BASICs most often drive pull-ins? • Why repeated easy-fix defects cost? • How clean streaks help.',
    },
    {
      id: 'DS-305',
      key: 'crashes-preventability',
      title: 'Crashes & Preventability Signals',
      promise: 'What counts—and when a review can help.',
      emoji: '🚑',
      accent: 'teal',
      flash: 'Crash data vs violations—different channels, both matter. • What evidence helps a preventability review?',
    },
    {
      id: 'DS-306',
      key: 'ninety-day-plan',
      title: '90-Day Improvement Plan (Driver + Company)',
      promise: 'A simple playbook: fix data, fix habits, track wins.',
      emoji: '📅',
      accent: 'orange',
      flash: 'What to fix first • How many clean inspections make a dent? • Weekly scoreboard: what to track?',
    },
  ];

  return (
    <div className="app violation-management-page driver-score-page">
      <GlobalHeader />
      <section className="section-padding">
        <div className="container">
          {/* Page header */}
          <div className="vm-header">
            <span className="vm-icon" aria-hidden>📈</span>
            <h1 id="ds-title">Driver Score Improvements</h1>
          </div>
          <p className="vm-sub">What hits your scores—and how to fix it.</p>
          <p className="vm-note">Educational use only; not legal advice.</p>
          <div className="ds-progress" aria-live="polite">Progress: 0/6 complete</div>

          {/* Six modules grid */}
          <section className="vm-grid" aria-labelledby="ds-title">
            {modules.map((m, idx) => (
              <div key={m.key} className={`vm-card vm-tile tile-${m.accent}`} role="region" aria-label={m.title}>
                <div className={`vm-rail rail-${m.accent}`} aria-hidden></div>
                <div className="vm-body">
                  <div className="vm-emoji" aria-hidden>{m.emoji}</div>
                  <h2 className="vm-title">{m.title} <span className="id-badge" aria-hidden>{m.id}</span></h2>
                  <span className="tile-chip" aria-label="status: new">NEW</span>
                  <p className="vm-sub">{m.promise}</p>
                  <p className="vm-note">Example flashcards: {m.flash}</p>
                  {m.link && (
                    <div className="tile-link-wrap">
                      <Link to={m.link} className="tile-link">Related: learn more</Link>
                    </div>
                  )}
                  <div className="ds-start">
                    <Link to="#" className="vm-start">Start</Link>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <div className="vm-actions">
            <Link to="/violations-management" className="btn-link">← Back to Violations Management</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
