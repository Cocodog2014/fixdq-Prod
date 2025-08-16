import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalHeader from '../../components/GlobalHeader';

const LS_LOGS = 'eld.logs';
const LS_SETUP = 'eld.setup';
const LS_DAY = 'eld.dayStart';
const todayKey = () => new Date().toISOString().slice(0,10);
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch { return d; } };
const saveLogs = (data) => localStorage.setItem(LS_LOGS, JSON.stringify(data));

const STATUS_Y = { D: 45, ON: 95, SB: 145, OFF: 195 }; // y positions for graph lines
const STATUS_COLOR = { D: '#22c55e', ON: '#f59e0b', SB: '#ef4444', OFF: '#64748b' };

function minutesFromMidnight(iso) {
  const d = new Date(iso);
  return d.getHours() * 60 + d.getMinutes();
}

function fmtHM(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${String(m).padStart(2,'0')}m`;
}

function buildSegments(entries) {
  const dayStart = 0;
  const nowIso = new Date().toISOString();
  const nowMin = minutesFromMidnight(nowIso);
  const sorted = [...entries].sort((a,b) => new Date(a.t) - new Date(b.t));
  const result = [];
  let cursor = dayStart;
  let lastStatus = sorted.length ? sorted[0].status : 'OFF';
  // Prepend starting segment if first entry isn't at 00:00
  if (sorted.length) {
    const firstMin = minutesFromMidnight(sorted[0].t);
    if (firstMin > 0) {
      result.push({ start: 0, end: firstMin, status: 'OFF', pc: false, ym: false });
      cursor = firstMin;
      lastStatus = sorted[0].status;
    }
  }
  for (let i = 0; i < sorted.length; i++) {
    const e = sorted[i];
    const start = minutesFromMidnight(e.t);
    // Close previous up to this start
    if (start > cursor) {
      result.push({ start: cursor, end: start, status: lastStatus, pc: false, ym: false });
    }
    // Switch to new status starting here
    lastStatus = e.status;
    cursor = start;
  }
  // Close to now
  if (nowMin > cursor) {
    result.push({ start: cursor, end: nowMin, status: lastStatus, pc: false, ym: false });
  }
  return result;
}

function drawGraph(canvas, entries, certified) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  canvas.width = w * window.devicePixelRatio;
  canvas.height = h * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  // Background
  ctx.fillStyle = '#0B1B4A';
  ctx.fillRect(0, 0, w, h);

  // Grid hours and quarter ticks
  ctx.lineWidth = 1;
  for (let hr = 0; hr <= 24; hr++) {
    const x = (w / 24) * hr;
    // hour line
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.beginPath(); ctx.moveTo(x, 24); ctx.lineTo(x, h - 16); ctx.stroke();
    // hour label every 2 hours
    if (hr % 2 === 0) {
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = '11px system-ui, -apple-system, Segoe UI, Roboto, Arial';
      const label = hr === 0 ? '12AM' : hr < 12 ? `${hr}AM` : hr === 12 ? '12PM' : `${hr-12}PM`;
      ctx.fillText(label, Math.max(2, x + 2), 16);
    }
    // quarter lines
    if (hr < 24) {
      for (let q = 1; q < 4; q++) {
        const xq = x + (w / 24) * (q / 4);
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.beginPath(); ctx.moveTo(xq, 24); ctx.lineTo(xq, h - 16); ctx.stroke();
      }
    }
  }

  // Horizontal lanes
  ['D','ON','SB','OFF'].forEach((st) => {
    const y = STATUS_Y[st];
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    // Left lane badge
    const badgeW = 42, badgeH = 22, bx = 4, by = y - badgeH + 2;
    ctx.fillStyle = STATUS_COLOR[st] || '#94a3b8';
    ctx.strokeStyle = '#0b1229';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect ? ctx.roundRect(bx, by, badgeW, badgeH, 5) : ctx.rect(bx, by, badgeW, badgeH); ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#0b1229'; ctx.globalAlpha = 0.12; ctx.fillRect(bx, by + badgeH - 6, badgeW, 6); ctx.globalAlpha = 1;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px system-ui, -apple-system, Segoe UI, Roboto, Arial';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(st, bx + badgeW/2, by + badgeH/2);
  });

  // Build block segments and draw
  const segs = buildSegments(entries);
  const xFromMin = (m) => (w * (m / (24 * 60)));
  segs.forEach((s) => {
    const y = STATUS_Y[s.status] - 20; // center block around lane
    const x1 = Math.max(0, xFromMin(s.start));
    const x2 = Math.min(w, xFromMin(s.end));
    const width = Math.max(1, x2 - x1);
    const height = 28;
    // Fill style: verified greenish vs unverified gray
    ctx.fillStyle = certified ? 'rgba(52, 211, 153, 0.65)' : 'rgba(203, 213, 225, 0.8)';
    ctx.strokeStyle = 'rgba(30, 41, 59, 0.8)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x1, y, width, height, 6) : ctx.rect(x1, y, width, height); ctx.fill(); ctx.stroke();
    // PC/YM hatch (simple diagonal lines)
    if (s.pc || s.ym) {
      ctx.save();
      ctx.beginPath(); ctx.rect(x1, y, width, height); ctx.clip();
      ctx.strokeStyle = 'rgba(2, 132, 199, 0.6)';
      for (let i = -height; i < width + height; i += 6) {
        ctx.beginPath();
        ctx.moveTo(x1 + i, y);
        ctx.lineTo(x1 + i + height, y + height);
        ctx.stroke();
      }
      ctx.restore();
    }
  });

  // Right side totals stack
  const totals = { OFF: 0, SB: 0, D: 0, ON: 0 };
  segs.forEach(s => { totals[s.status] = (totals[s.status] || 0) + (s.end - s.start); });
  const rightX = w - 60;
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect ? ctx.roundRect(rightX, 28, 56, 180, 8) : ctx.rect(rightX, 28, 56, 180); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#0b1229';
  ctx.font = 'bold 11px system-ui, -apple-system, Segoe UI, Roboto, Arial';
  ctx.textAlign = 'center';
  [['OFF', STATUS_Y.OFF], ['SB', STATUS_Y.SB], ['D', STATUS_Y.D], ['ON', STATUS_Y.ON]].forEach(([st, y]) => {
    const t = fmtHM(totals[st] || 0);
    ctx.fillText(t, rightX + 28, y - 6);
  });
}

function ELDDevice() {
  const [logs, setLogs] = useState(load(LS_LOGS, {}));
  const [pc, setPc] = useState(false);
  const [ym, setYm] = useState(false);
  const [tick, setTick] = useState(0);
  const setup = load(LS_SETUP, {});
  const dayStart = load(LS_DAY, {});
  const day = todayKey();
  const entries = logs[day] || [];
  const canvasRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60000); // redraw each minute
    return () => clearInterval(id);
  }, []);

  useEffect(() => { drawGraph(canvasRef.current, entries, certified); }, [entries, tick, certified]);
  useEffect(() => { saveLogs(logs); }, [logs]);

  const addStatus = (status) => {
    const e = { t: new Date().toISOString(), status, pc, ym };
    const next = { ...logs, [day]: [...entries, e] };
    setLogs(next);
  };

  const certify = () => {
    const next = { ...logs, [`${day}:cert`]: true };
    setLogs(next);
  };

  const certified = !!logs[`${day}:cert`];
  const timeStr = useMemo(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' }), [tick]);

  return (
    <div className="eld-device-page app">
      <GlobalHeader />
      <section className="container">
        <div className="eld-device">
          <div className="bezel">
            <div className="camera"></div>
            <div className="speaker"></div>
            <div className="screen">
              {/* Status bar */}
              <div className="status-bar">
                <div className="sb-left">
                  <div className="time">{timeStr}</div>
                  <div className="driver">{setup.driverName || 'Driver'}</div>
                </div>
                <div className="sb-right">
                  <div className="unit">Unit {dayStart.unit || '—'}</div>
                  <div className="cycle">Cycle {setup.cycle || '60/7'}</div>
                </div>
              </div>

              {/* Graph header + canvas */}
              <div className="graph-header">
                <button className={`verify ${certified ? 'on' : ''}`} onClick={certify} disabled={certified}>👍 Verify</button>
              </div>
              <div className="graph-wrap">
                <canvas ref={canvasRef} className="graph" width={800} height={220} />
                <div className="legend">
                  <div className="lg-item"><span className="lg swatch verified"></span>Verified</div>
                  <div className="lg-item"><span className="lg swatch unverified"></span>Unverified</div>
                  <div className="lg-item"><span className="lg swatch edited"></span>Edited</div>
                  <div className="lg-item"><span className="lg swatch hatch"></span>PC / Yard Move</div>
                  <div className="lg-item"><span className="lg swatch violation"></span>Violation</div>
                </div>
              </div>

              {/* Controls */}
              <div className="controls">
                <div className="toggles">
                  <button className={`toggle ${pc?'on':''}`} onClick={() => setPc(!pc)}>PC</button>
                  <button className={`toggle ${ym?'on':''}`} onClick={() => setYm(!ym)}>YM</button>
                </div>
                <div className="pad">
                  <button className="pad-btn off" onClick={() => addStatus('OFF')}>OFF</button>
                  <button className="pad-btn sb" onClick={() => addStatus('SB')}>SB</button>
                  <button className="pad-btn on" onClick={() => addStatus('ON')}>ON</button>
                  <button className="pad-btn drive" onClick={() => addStatus('D')}>DRIVE</button>
                </div>
              </div>

              {/* Soft keys */}
              <div className="softkeys">
                <Link to="/eld-coach/status" className="soft">Status</Link>
                <button className="soft" onClick={certify}>{certified ? 'Certified' : 'Certify'}</button>
                <Link to="/eld-coach/transfer" className="soft">Transfer</Link>
                <Link to="/eld-coach/risk" className="soft">Scanner</Link>
                <Link to="/eld-coach" className="soft">Menu</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="back-link">
          <Link to="/eld-coach" className="btn btn-primary">← Back to ELD Coach</Link>
        </div>
      </section>
    </div>
  );
}

export default ELDDevice;
