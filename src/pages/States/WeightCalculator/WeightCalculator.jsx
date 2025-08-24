import React, { useEffect, useMemo, useState } from 'react'

// Federal baseline limits (informational; verify with posted limits/permits)
const FEDERAL_LIMITS = { singleAxle: 20000, tandemAxle: 34000, gross: 80000 }

// Bridge Formula B utility: W = 500 * [ (L*N)/(N-1) + 12N + 36 ]
function bridgeLimitW(Lft, N) {
  if (!isFinite(Lft) || Lft <= 0 || !Number.isFinite(N) || N < 2) return null
  const raw = 500 * ((Lft * N) / (N - 1) + 12 * N + 36)
  return Math.floor(raw / 500) * 500 // round down to nearest 500 lb
}

// Presets removed per request; users now input all data manually.

export default function WeightCalculator({ onClose }) {
  const [axles, setAxles] = useState(5)
  const [unit1Axles, setUnit1Axles] = useState(3) // axles on first power unit touching ground
  const [unit2Axles, setUnit2Axles] = useState(2) // axles on second unit (e.g., trailer) touching ground
  const [equipment, setEquipment] = useState('') // jeep dolly / booster / stinger / flip axle / flip booster
  const [jeepAxles, setJeepAxles] = useState(2) // when jeep selected: 2 or 3
  const [spacings, setSpacings] = useState([12, 4, 33, 4].map(ft => ({ ft, in: 0 })))
  const [axleWeights, setAxleWeights] = useState([12000, 17000, 17000, 10000, 10000])
  const [overallLength, setOverallLength] = useState({ ft: 72, in: 0 })
  const [loadWidth, setLoadWidth] = useState({ ft: 8, in: 6 }) // 8'6" typical max legal width

  // Maintain array sizes when axle count changes
  useEffect(() => {
    const jeepCount = equipment === 'jeep' ? jeepAxles : 0
    const desired = Math.min(12, unit1Axles + jeepCount + unit2Axles)
    if (axles !== desired) setAxles(desired)
    const needSpacings = Math.max(1, desired - 1)
    setSpacings(prev => {
      const next = prev.slice(0, needSpacings)
      while (next.length < needSpacings) next.push({ ft: 10, in: 0 })
      return next
    })
    setAxleWeights(prev => {
      const next = prev.slice(0, desired)
      while (next.length < desired) next.push(0)
      return next
    })
  }, [unit1Axles, unit2Axles, equipment, jeepAxles, axles])

  // Preset application removed.

  // Axle positions from front, in feet
  const positions = useMemo(() => {
    const pos = [0]
    for (let i = 0; i < spacings.length; i++) {
      const d = (Number(spacings[i]?.ft) || 0) + (Number(spacings[i]?.in) || 0) / 12
      pos.push((pos[i] || 0) + d)
    }
    return pos
  }, [spacings])

  const gvw = useMemo(() => axleWeights.reduce((a, b) => a + (Number(b) || 0), 0), [axleWeights])

  const spacingLabel = (i) => {
    const left = i + 1, right = i + 2
    const jeepCount = equipment === 'jeep' ? jeepAxles : 0
    const name = (idx) => {
      if (idx === 1) return 'Steer'
      if (idx === 2 && unit1Axles > 1) return 'Drive 1'
      if (idx === 3 && unit1Axles > 2) return 'Drive 2'
      const jeepStart = unit1Axles + 1
      const jeepEnd = unit1Axles + jeepCount
      if (jeepCount && idx >= jeepStart && idx <= jeepEnd) return `Jeep ${idx - unit1Axles}`
      const trailerIndex = idx - unit1Axles - jeepCount
      if (trailerIndex >= 1) return `Unit2 ${trailerIndex}`
      return `Axle ${idx}`
    }
    return `${name(left)} → ${name(right)} (ft/in)`
  }

  // All consecutive axle groups
  const groups = useMemo(() => {
    const out = []
    for (let i = 0; i < axles; i++) {
      for (let j = i + 1; j < axles; j++) {
        const N = j - i + 1
        const L = positions[j] - positions[i]
        const W = bridgeLimitW(L, N)
        const actual = axleWeights.slice(i, j + 1).reduce((a, b) => a + (Number(b) || 0), 0)
        out.push({ i: i + 1, j: j + 1, N, L, W, actual, pass: W ? actual <= W : false })
      }
    }
    return out
  }, [axles, positions, axleWeights])

  // Tandem checks (40" < spacing <= 96")
  const tandems = useMemo(() => {
    const out = []
    for (let i = 0; i < axles - 1; i++) {
      const inches = Math.round(((Number(spacings[i]?.ft) || 0) * 12) + (Number(spacings[i]?.in) || 0))
      const actual = (Number(axleWeights[i]) || 0) + (Number(axleWeights[i + 1]) || 0)
      const within = inches > 40 && inches <= 96
      out.push({ a1: i + 1, a2: i + 2, inches, actual, limit: within ? FEDERAL_LIMITS.tandemAxle : null, pass: within ? actual <= FEDERAL_LIMITS.tandemAxle : null })
    }
    return out
  }, [spacings, axleWeights, axles])

  const singleAxle = axleWeights.map(w => ({ actual: Number(w) || 0, limit: FEDERAL_LIMITS.singleAxle }))
  const outerGroup = groups.find(g => g.i === 1 && g.j === axles)
  const overallPass = (singleAxle.every(s => s.actual <= s.limit)
    && tandems.every(t => t.pass !== false)
    && groups.every(g => g.pass)
    && gvw <= FEDERAL_LIMITS.gross)

  const fmt = (n) => (n ?? n === 0) ? n.toLocaleString() : '—'

  return (
    <section className="wc-wrap" aria-label="Advanced axle & bridge weight calculator">
      {onClose && (
        <button type="button" className="wc-close" aria-label="Close weight calculator" onClick={onClose}>✕</button>
      )}
      <header className="wc-header">
        <div className="wc-title"><span className="wc-dot" aria-hidden></span><h2>Advanced Axle Group & Bridge Calculator</h2></div>
        <p className="wc-sub">Select axle count, then enter spacings and per-axle weights. Checks single axles, tandems, all groups, and GVW.</p>
      </header>
      <div className="wc-controls">
  <div className="ctrl"><label>Unit 1 axles touching the ground</label><select value={unit1Axles} onChange={(e)=>{const val=Math.min(5, Math.max(1, Number(e.target.value))); setUnit1Axles(val);}}>{Array.from({ length: 5 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}</select></div>
  <div className="ctrl"><label>Unit 2 axles touching the ground</label><select value={unit2Axles} onChange={(e)=>{const val=Math.min(5, Math.max(0, Number(e.target.value))); setUnit2Axles(val);}}>{Array.from({ length: 6 }, (_, i) => i).map(n => <option key={n} value={n}>{n}</option>)}</select></div>
        <div className="ctrl"><label>Total axles (auto)</label><input type="number" value={axles} disabled aria-label="Total axles automatically calculated" /></div>
  <div className="ctrl"><label>Overall length (ft)</label><input type="number" min={0} step={1} value={overallLength.ft} onChange={(e)=>setOverallLength(v=>({...v, ft:Number(e.target.value)||0}))} /></div>
  <div className="ctrl"><label>Overall length (in)</label><input type="number" min={0} max={11} step={1} value={overallLength.in} onChange={(e)=>setOverallLength(v=>({...v, in:Number(e.target.value)||0}))} /></div>
  <div className="ctrl"><label>Load width (ft)</label><input type="number" min={0} step={1} value={loadWidth.ft} onChange={(e)=>setLoadWidth(v=>({...v, ft:Number(e.target.value)||0}))} /></div>
  <div className="ctrl"><label>Load width (in)</label><input type="number" min={0} max={11} step={1} value={loadWidth.in} onChange={(e)=>setLoadWidth(v=>({...v, in:Number(e.target.value)||0}))} /></div>
        <div className="ctrl full-row wc-equip-select">
          <label>
            <span className="wc-equip-label">Additional equipment <span className="wc-optional-tag" aria-hidden>optional</span> – <span className="wc-equip-examples">dollies, boosters, flip axles</span></span>
            <select value={equipment} onChange={(e)=>setEquipment(e.target.value)} aria-label="Additional equipment (optional): select jeep dolly, booster, or flip axle if used">
              <option value="">— none —</option>
              <option value="jeep">Jeep dolly (2–3-axle dolly between tractor and lowboy to add front axles & spread weight)</option>
              <option value="booster">Booster / Stinger</option>
              <option value="flip">Flip axle / Flip booster</option>
            </select>
          </label>
          {equipment === 'jeep' && (
            <div className="wc-jeep-config">
              <label>Jeep dolly axles
                <select value={jeepAxles} onChange={(e)=>setJeepAxles(Math.min(3, Math.max(2, Number(e.target.value))))}>
                  {[2,3].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </label>
              <p className="wc-note-jeep">Jeep dolly: a 2–3-axle dolly between the tractor and the lowboy to add axles up front and spread weight (no deck cargo).</p>
            </div>
          )}
        </div>
      </div>
      <div className="wc-section"><div className="wc-h3">Measure between axles (center → next)</div><div className="wc-grid-3">{spacings.map((s, i) => (<div className="ctrl" key={i}><label>{spacingLabel(i)}</label><div className="wc-duo"><input type="number" min={0} step={1} value={s.ft} onChange={(e)=>{const v=[...spacings]; v[i]={...v[i], ft:Number(e.target.value)||0}; setSpacings(v)}} /><input type="number" min={0} max={11} step={1} value={s.in} onChange={(e)=>{const v=[...spacings]; v[i]={...v[i], in:Number(e.target.value)||0}; setSpacings(v)}} /></div></div>))}</div></div>
      <div className="wc-section"><div className="wc-h3">Per-axle weights (lb)</div><div className="wc-grid-5">{axleWeights.map((w, i) => (<div className="ctrl" key={i}><label>Axle {i+1}</label><input type="number" min={0} step={100} value={w} onChange={(e)=>{const v=[...axleWeights]; v[i]=Number(e.target.value)||0; setAxleWeights(v)}} /></div>))}</div></div>
      <div className="wc-kpis"><div className="k"><div className="small">GVW</div><div className="v">{fmt(gvw)} lb</div></div><div className="k"><div className="small">GVW Limit</div><div className="v">{fmt(FEDERAL_LIMITS.gross)} lb</div></div><div className="k"><div className="small">Outer Group W (1→{axles})</div><div className="v">{fmt(outerGroup?.W)} lb</div></div><div className={`badge ${overallPass ? 'ok' : 'warn'}`}>{overallPass ? 'Overall: PASS' : 'Overall: ATTENTION'}</div></div>
      <div className="wc-card"><h3>Single-Axle Checks</h3><div className="wc-table-wrap"><table className="wc-table"><thead><tr><th>Axle</th><th>Weight</th><th>Limit</th><th>Status</th></tr></thead><tbody>{singleAxle.map((s, i) => (<tr key={i}><td>{i+1}</td><td>{fmt(s.actual)} lb</td><td>{fmt(s.limit)} lb</td><td><span className={`pill ${s.actual <= s.limit ? 'ok' : 'bad'}`}>{s.actual <= s.limit ? 'OK' : 'OVER'}</span></td></tr>))}</tbody></table></div></div>
      <div className="wc-card"><h3>Tandem Checks (40"–96")</h3><div className="wc-table-wrap"><table className="wc-table"><thead><tr><th>Pair</th><th>Spacing (in)</th><th>Total</th><th>Limit</th><th>Status</th></tr></thead><tbody>{tandems.map((t, i) => (<tr key={i}><td>{t.a1}–{t.a2}</td><td>{t.inches}</td><td>{fmt(t.actual)} lb</td><td>{t.limit ? fmt(t.limit) + ' lb' : 'n/a'}</td><td><span className={`pill ${t.limit === null ? 'na' : (t.pass ? 'ok' : 'bad')}`}>{t.limit === null ? 'n/a' : (t.pass ? 'OK' : 'OVER')}</span></td></tr>))}</tbody></table></div></div>
      <div className="wc-card"><h3>Bridge Formula – All Consecutive Groups</h3><div className="wc-table-wrap"><table className="wc-table"><thead><tr><th>Group</th><th>N</th><th>L (ft)</th><th>W (limit)</th><th>Actual</th><th>Status</th></tr></thead><tbody>{groups.map((g, idx) => (<tr key={idx}><td>{g.i}→{g.j}</td><td>{g.N}</td><td>{g.L.toFixed(2)}</td><td>{fmt(g.W)} lb</td><td>{fmt(g.actual)} lb</td><td><span className={`pill ${g.pass ? 'ok' : 'bad'}`}>{g.pass ? 'OK' : 'OVER'}</span></td></tr>))}</tbody></table></div></div>
      <p className="wc-note"><strong>Note:</strong> This tool aids planning. Always verify posted limits, permits, and state statutes. Oversize/overweight loads may require escorts, signage, and route approvals.</p>
    </section>
  )
}
