import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalHeader from '../../components/GlobalHeader';

const LS_LOGS = 'eld.logs';
const nowIso = () => new Date().toISOString();
const todayKey = () => new Date().toISOString().slice(0,10);
const loadLogs = () => { try { return JSON.parse(localStorage.getItem(LS_LOGS))||{}; } catch { return {}; } };
const saveLogs = (data) => localStorage.setItem(LS_LOGS, JSON.stringify(data));

function ELDStatusPad() {
  const [logs, setLogs] = useState(loadLogs());
  const day = todayKey();
  const entries = logs[day] || [];
  const [pc, setPc] = useState(false);
  const [ym, setYm] = useState(false);
  const [certified, setCertified] = useState(!!logs[`${day}:cert`]);

  useEffect(() => { saveLogs(logs); }, [logs]);

  const addStatus = (status) => {
    const e = { t: nowIso(), status, pc, ym };
    const next = { ...logs, [day]: [...entries, e] };
  setLogs(next);
  try { localStorage.setItem(LS_LOGS, JSON.stringify(next)); } catch {}
  // Notify other views (device) instantly
  window.dispatchEvent(new Event('eld:logs-updated'));
  };

  const certify = () => {
    const next = { ...logs, [`${day}:cert`]: true };
  setLogs(next); setCertified(true);
  try { localStorage.setItem(LS_LOGS, JSON.stringify(next)); } catch {}
  window.dispatchEvent(new Event('eld:logs-updated'));
  };

  const current = entries[entries.length-1];
  const currentLabel = useMemo(() => {
    if (!current) return '—';
    return `${current.status}${current.pc?' + PC':''}${current.ym?' + YM':''}`;
  }, [current]);

  return (
    <div className="eld-status app">
      <GlobalHeader />
      <section className="container">
        <h1>Duty Controller</h1>
        <div className="back-link" style={{ marginBottom: 8 }}>
          <Link to="/eld-coach" className="btn btn-primary">← Back to ELD Coach</Link>
        </div>
        <div className="status-row">
          <div className={`toggle ${pc?'on':''}`} onClick={() => setPc(!pc)}>PC</div>
          <div className={`toggle ${ym?'on':''}`} onClick={() => setYm(!ym)}>YM</div>
        </div>
        <div className="pad">
          <button className="pad-btn off" onClick={() => addStatus('OFF')}>OFF</button>
          <button className="pad-btn sb" onClick={() => addStatus('SB')}>SB</button>
          <button className="pad-btn on" onClick={() => addStatus('ON')}>ON</button>
          <button className="pad-btn drive" onClick={() => addStatus('D')}>DRIVE</button>
        </div>
        <div className="card">
          <div>Current: <strong>{currentLabel}</strong></div>
          <div className="entries">
            {entries.length===0 && <div>No statuses yet today.</div>}
            {entries.map((e, i) => (
              <div key={i} className="entry">
                <span className="time">{new Date(e.t).toLocaleTimeString()}</span>
                <span className="st">{e.status}</span>
                {e.pc && <span className="badge pc">PC</span>}
                {e.ym && <span className="badge ym">YM</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="actions">
          <button className="btn" onClick={certify} disabled={certified}>{certified?'Certified':'Certify Day'}</button>
          <button className="btn" onClick={() => { localStorage.removeItem(LS_LOGS); setLogs({}); setCertified(false); }}>Reset Logs</button>
        </div>
        <div className="back-link" style={{ marginTop: 12 }}>
          <Link to="/eld-coach" className="btn btn-primary">← Back to ELD Coach</Link>
        </div>
      </section>
    </div>
  );
}

export default ELDStatusPad;
