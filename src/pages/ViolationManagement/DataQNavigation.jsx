import GlobalHeader from '../../components/GlobalHeader';
import { Link } from 'react-router-dom';

export default function DataQNavigation() {
  const modules = [
    {
      key: 'basics-roles',
      title: 'DataQs Basics & Roles',
      promise: 'Who can file, what DataQs changes, and how it differs from traffic court.',
      flash: 'What does DataQs actually correct?  •  Driver vs. carrier—who files for a company driver?',
      emoji: '📘',
      accent: 'blue',
    },
    {
      key: 'request-type',
      title: 'Pick the Right Request Type',
      promise: 'Match your issue to the correct DataQs path (Inspection/Violation, Crash, Adjudicated, Carrier/Vehicle, PSP).',
      flash: 'Which type fixes an inspection violation that’s factually wrong?  •  Court dismissed the ticket—what Request Type?',
      emoji: '🗂️',
      accent: 'purple',
    },
    {
      key: 'ids-jurisdiction',
      title: 'Find the Right Numbers (IDs & Jurisdiction)',
      promise: 'Inspection/crash number, date, state/jurisdiction, unit, VIN, USDOT, citation number.',
      flash: 'Where do you find the inspection report number?  •  Cited in NV but inspected in CA—Which state?',
      emoji: '🔎',
      accent: 'orange',
    },
    {
      key: 'evidence-kit',
      title: 'Build a Winning Submission (Evidence Kit)',
      promise: 'Photos, repair orders, ELD logs, court disposition, training records, BOLs, timestamps, dashcam stills; redact wisely.',
      flash: 'What document proves a ticket was reduced/dismissed?  •  Why add a repair order to a defect dispute?',
      emoji: '🧰',
      accent: 'red',
    },
    {
      key: 'file-track-respond',
      title: 'File → Track → Respond',
      promise: 'Filing flow, status stages, timelines, and how to handle follow-ups.',
      flash: 'Case is “Closed—No Change.” What’s next?  •  Why keep a dated case log with attachments?',
      emoji: '🧭',
      accent: 'teal',
    },
    {
      key: 'adjudicated-cleanup',
      title: 'Adjudicated Citations & Post-Outcome Cleanup',
      promise: 'When court changes a ticket, align the inspection via DataQs; proof, denials, and resubmission tips.',
      flash: 'Ticket reduced to non-moving—does CSA change automatically?  •  Which attachment is mandatory?',
      emoji: '⚖️',
      accent: 'blue',
    },
  ];

  return (
    <div className="app violation-management-page dataq-navigation-page">
      <GlobalHeader />
      <section className="section-padding">
        <div className="container">
          {/* Page header */}
          <div className="vm-header">
            <span className="vm-icon" aria-hidden>🧭</span>
            <h1 id="dq-title">DataQs System Navigation</h1>
          </div>
          <p className="vm-sub">Fix what’s in the federal record. Route it right.</p>
          <p className="vm-note">Educational use only; not legal advice.</p>

          {/* Six modules grid */}
          <section className="vm-grid" aria-labelledby="dq-title">
            {modules.map((m) => (
              <div key={m.key} className={`vm-card vm-tile tile-${m.accent}`} role="region" aria-label={m.title}>
                <div className={`vm-rail rail-${m.accent}`} aria-hidden></div>
                <div className="vm-body">
                  <div className="vm-emoji" aria-hidden>{m.emoji}</div>
                  <h2 className="vm-title">{m.title}</h2>
                  <p className="vm-sub">{m.promise}</p>
                  <p className="vm-note">Example flashcards: {m.flash}</p>
                  <div className="dq-start">
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
