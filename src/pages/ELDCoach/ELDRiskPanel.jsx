import GlobalHeader from '../../components/GlobalHeader';

const get = (k, fallback) => { try { return JSON.parse(localStorage.getItem(k)) || fallback; } catch { return fallback; } };
const todayKey = () => new Date().toISOString().slice(0,10);

function ELDRiskPanel() {
  const setup = get('eld.setup', {});
  const day = get('eld.dayStart', {});
  const logs = get('eld.logs', {});
  const dayKey = todayKey();
  const entries = logs[dayKey] || [];
  const certified = !!logs[`${dayKey}:cert`];

  const risks = [];
  if (!certified) risks.push({ level: 'red', text: 'Log not certified for today' });
  if (!day.bol) risks.push({ level: 'amber', text: 'Missing BOL / shipping document #' });
  if (!day.location) risks.push({ level: 'amber', text: 'Missing location on start of day' });
  const hasBreak = entries.some(e => e.status === 'OFF' || e.status === 'SB');
  if (!hasBreak) risks.push({ level: 'amber', text: 'No OFF/SB break recorded yet' });
  if (!setup.cycle) risks.push({ level: 'green', text: 'Cycle not set: defaulting to 60/7 — set in Setup' });

  return (
    <div className="eld-risk app">
      <GlobalHeader />
      <section className="container">
        <h1>Risk Scanner</h1>
        <div className="card">
          {risks.length === 0 && <div className="good">No issues detected based on current data.</div>}
          {risks.map((r, i) => (
            <div key={i} className={`risk ${r.level}`}>• {r.text}</div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ELDRiskPanel;
