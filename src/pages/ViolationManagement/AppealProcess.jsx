import GlobalHeader from '../../components/GlobalHeader';
import { Link } from 'react-router-dom';

export default function AppealProcess() {
  const modules = [
    {
      key: 'step-1-confirm',
      title: 'Step 1: Confirm the issue',
      promise: 'Identify the correction: inspection/violation, crash, carrier/vehicle data, or adjudicated citation.',
      extra: 'You’ll need: report number, date/state, unit/VIN, citation info. Why it matters: right path speeds review.',
      emoji: '📝',
      accent: 'blue',
      refs: 'A&I Online',
    },
    {
      key: 'step-2-login',
      title: 'Step 2: Log in / Register',
      promise: 'Drivers/public: Login.gov at DataQs. Carriers: FMCSA Portal → DataQs (roles linked to Login.gov).',
      extra: 'Tip: Anyone can register and file at no cost. dataqs.fmcsa.dot.gov • portal.fmcsa.dot.gov',
      emoji: '🔐',
      accent: 'purple',
      refs: 'DataQs • FMCSA Portal',
    },
    {
      key: 'step-3-request-type',
      title: 'Step 3: Pick request type',
      promise: 'Choose Inspection/Violation, Crash, Adjudicated Citation, Carrier/Vehicle, or PSP.',
      extra: 'Tip: Use Adjudicated Citation when court changes a ticket tied to an inspection.',
      emoji: '🗂️',
      accent: 'orange',
      refs: 'A&I Online',
    },
    {
      key: 'step-4-evidence',
      title: 'Step 4: Attach proof',
      promise: 'Upload: inspection/crash report, court disposition, repair orders, ELD logs, photos/video, affidavits.',
      extra: 'Tip: Front‑load key docs to avoid delays. A&I Online • FMCSA',
      emoji: '📎',
      accent: 'red',
    },
    {
      key: 'step-5-file-track',
      title: 'Step 5: Submit & track',
      promise: 'File the RDR, note the case number, monitor status, and respond quickly to follow‑ups.',
      extra: 'FYI: Some reviews take weeks+ (watch your queue).',
      emoji: '📬',
      accent: 'teal',
      refs: 'FMCSA',
    },
    {
      key: 'step-6-outcomes',
      title: 'Step 6: Outcome → next steps',
      promise: 'If approved: verify SMS/PSP updates. If “No Change”: refile only with new evidence or correct type.',
      extra: 'Adjudicated: when court reduces/dismisses, file/update via Adjudicated Citation so the inspection aligns.',
      emoji: '✅',
      accent: 'blue',
      refs: 'CSA Compliance',
    },
  ];

  return (
    <div className="app violation-management-page appeal-process-page">
      <GlobalHeader />
      <section className="section-padding">
        <div className="container">
          {/* Page header */}
          <div className="vm-header">
            <span className="vm-icon" aria-hidden>📑</span>
            <h1 id="ap-title">Appeal Process (DataQs)</h1>
          </div>
          <p className="vm-sub">Fix what’s wrong in the federal record—step by step.</p>
          <p className="vm-note">Educational use only; not legal advice.</p>

          {/* Six modules grid */}
          <section className="vm-grid" aria-labelledby="ap-title">
            {modules.map((m) => (
              <div key={m.key} className={`vm-card vm-tile tile-${m.accent}`} role="region" aria-label={m.title}>
                <div className={`vm-rail rail-${m.accent}`} aria-hidden></div>
                <div className="vm-body">
                  <div className="vm-emoji" aria-hidden>{m.emoji}</div>
                  <h2 className="vm-title">{m.title}</h2>
                  <p className="vm-sub">{m.promise}</p>
                  {m.extra && <p className="vm-note">{m.extra}</p>}
                  {m.refs && <p className="vm-note">Refs: {m.refs}</p>}
                  <div className="ap-start">
                    <Link to="#" className="vm-start">Start</Link>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Footer helper links */}
          <div className="vm-actions">
            <Link to="/violations-management" className="btn-link">← Back to Violations Management</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
