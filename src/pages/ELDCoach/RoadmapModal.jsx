import { useEffect } from 'react';
import './RoadmapModal.css';

function RoadmapModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="roadmap-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="roadmap-title" onClick={onClose}>
      <div className="roadmap-modal" onClick={(e) => e.stopPropagation()}>
        <button className="roadmap-close" onClick={onClose} aria-label="Close">×</button>
        <h2 id="roadmap-title">ELD & Logbook Coach — In Progress</h2>

        <div className="roadmap-body">
          <div className="roadmap-section">
            <h3>Now building</h3>
            <ul>
              <li>Scenario engine</li>
              <li>HOS counters</li>
              <li>Split-sleeper logic</li>
              <li>Exportable summaries</li>
            </ul>
          </div>
          <div className="roadmap-section">
            <h3>Next up</h3>
            <ul>
              <li>Adverse driving exceptions</li>
              <li>Yard moves</li>
              <li>Inspection flow</li>
            </ul>
          </div>
        </div>

        <div className="roadmap-ctas">
          <button className="btn btn-primary" onClick={onClose}>Explore what we've done so far</button>
        </div>

        <p className="roadmap-footnote">Educational use only; not an ELD device.</p>
      </div>
    </div>
  );
}

export default RoadmapModal;
