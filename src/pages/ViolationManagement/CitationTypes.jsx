import GlobalHeader from '../../components/GlobalHeader';
import { Link } from 'react-router-dom';

export default function CitationTypes() {
  const modules = [
    {
      key: 'spot-paperwork',
      title: 'Spot the Paperwork',
      promise: 'Tell them apart at a glance: ticket vs. inspection vs. OOS order.',
      flash: 'Which one lists an inspection level (I–VI)?',
      emoji: '🧾',
      accent: 'blue',
    },
    {
      key: 'where-it-goes',
      title: 'Where It Goes',
      promise: 'Ticket → traffic court. Inspection → DataQs.',
      flash: 'Which system fixes an incorrect inspection entry?',
      emoji: '📍',
      accent: 'purple',
    },
    {
      key: 'what-it-impacts',
      title: 'What It Impacts',
      promise: 'Ticket hits MVR/insurance; inspection hits CSA/BASICs/PSP.',
      flash: 'Does a speeding ticket without an inspection affect CSA?',
      emoji: '📊',
      accent: 'orange',
    },
    {
      key: 'oos-basics',
      title: 'Out-of-Service Basics',
      promise: 'When you must not move, and what clears OOS.',
      flash: 'What must you document before moving a vehicle after OOS?',
      emoji: '⛔',
      accent: 'red',
    },
    {
      key: 'adjudicated-citations',
      title: 'Adjudicated Citations (DataQs)',
      promise: 'If the court changes the ticket, align the inspection record.',
      flash: 'Which DataQs type updates post-court outcomes?',
      emoji: '🧑‍⚖️',
      accent: 'teal',
    },
    {
      key: 'next-steps',
      title: 'Next Steps: Driver vs Company',
      promise: 'Two checklists: capture docs, repairs, submissions, timelines.',
      flash: 'Driver’s first two steps after receiving a ticket + inspection?',
      emoji: '✅',
      accent: 'blue',
    },
  ];

  return (
    <div className="app violation-management-page citation-types-page">
      <GlobalHeader />
      <section className="section-padding">
        <div className="container">
          {/* Landing hero */}
          <div className="vm-header">
            <span className="vm-icon" aria-hidden>⚖️</span>
            <h1 id="ct-title">State vs. Federal Citations</h1>
          </div>
          <p className="vm-sub">“Ticket = Court. Inspection = DataQs. Both = Both.”</p>
          <p className="vm-note">Educational use only; not legal advice.</p>

          {/* Six core modules grid */}
          <section className="vm-grid" aria-labelledby="ct-title">
            {modules.map((m) => (
              <div key={m.key} className={`vm-card vm-tile tile-${m.accent}`} role="region" aria-label={m.title}>
                <div className={`vm-rail rail-${m.accent}`} aria-hidden></div>
                <div className="vm-body">
                  <div className="vm-emoji" aria-hidden>{m.emoji}</div>
                  <h2 className="vm-title">{m.title}</h2>
                  <p className="vm-sub">{m.promise}</p>
                  <p className="vm-note">Example flashcard: {m.flash}</p>
                  <div className="ct-start">
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
