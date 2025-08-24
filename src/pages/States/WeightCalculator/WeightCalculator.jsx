import React, { useEffect, useMemo, useState } from 'react'
import AxleDiagram from './AxleDiagram'

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
  const [manualUnits, setManualUnits] = useState(null) // null = auto, else explicit 1–5
  const [unit1Axles, setUnit1Axles] = useState(3) // axles on first power unit touching ground
  const [unit2Axles, setUnit2Axles] = useState(2) // axles on second unit (e.g., trailer) touching ground
  const [equipment, setEquipment] = useState('') // jeep dolly / booster / stinger / flip axle / flip booster
  const [jeepAxles, setJeepAxles] = useState(2) // when jeep selected: 2 or 3
  const [boosterAxles, setBoosterAxles] = useState(1) // when booster selected: 1-3
  const [flipAxles, setFlipAxles] = useState(1) // when flip selected: 1–2
  const [spacings, setSpacings] = useState([12, 4, 33, 4].map(ft => ({ ft, in: 0 })))
  const [axleWeights, setAxleWeights] = useState([12000, 17000, 17000, 10000, 10000])
  const [overallLength, setOverallLength] = useState({ ft: 72, in: 0 })
  const [loadWidth, setLoadWidth] = useState({ ft: 8, in: 6 }) // 8'6" typical max legal width

  // Maintain array sizes when axle count changes
  useEffect(() => {
    const jeepCount = equipment === 'jeep' ? jeepAxles : 0
    const boosterCount = equipment === 'booster' ? boosterAxles : 0
    const flipCount = equipment === 'flip' ? flipAxles : 0
    // Clamp booster/jeep counts if combined exceeds capacity
    let desired = unit1Axles + jeepCount + unit2Axles + boosterCount + flipCount
    if (desired > 12) {
      // Try reducing booster or flip first (these can be smaller), then jeep
      if (boosterCount && equipment === 'booster') {
        const overflow = desired - 12
        const newBooster = Math.max(0, boosterCount - overflow)
        if (newBooster !== boosterAxles) setBoosterAxles(newBooster || 1)
        desired = unit1Axles + jeepCount + unit2Axles + (equipment === 'booster' ? newBooster : 0) + flipCount
      } else if (flipCount && equipment === 'flip') {
        const overflow = desired - 12
        const newFlip = Math.max(0, flipCount - overflow)
        if (newFlip !== flipAxles) setFlipAxles(newFlip || 1)
        desired = unit1Axles + jeepCount + unit2Axles + boosterCount + (equipment === 'flip' ? newFlip : 0)
      } else if (jeepCount && equipment === 'jeep') {
        const overflow = desired - 12
        const newJeep = Math.max(0, jeepCount - overflow)
        if (newJeep !== jeepAxles) setJeepAxles(Math.max(2, newJeep) || 2)
        desired = unit1Axles + (equipment === 'jeep' ? newJeep : 0) + unit2Axles + boosterCount + flipCount
      }
    }
    desired = Math.min(12, desired)
    if (axles !== desired) setAxles(desired)
    const needSpacings = Math.max(1, desired - 1)
    setSpacings(prev => {
      const next = prev.slice(0, needSpacings)
      while (next.length < needSpacings) next.push({ ft: 10, in: 0 })
      // When Unit 1 upgrades from 3 to 4 axles we want the new 4th drive axle only ~4 ft behind axle 3.
      // In the 3-axle tractor case index 2 (between axle 3 and 4 overall) was the tractor->trailer gap (often 33 ft).
      // After adding a 4th tractor axle that long gap must shift one position later.
      if (unit1Axles >= 4 && unit2Axles > 0) {
        const driveToNewIdx = 2 // spacing between axle3 and new axle4 (all within tractor now)
        const orig = next[driveToNewIdx]
        // Detect a long trailer gap sitting where the new drive spacing should be (e.g., >= 20 ft)
        if (orig && Number(orig.ft) >= 20) {
          const trailerGap = { ...orig }
          // Place 4 ft default for new internal drive spacing
          next[driveToNewIdx] = { ft: 4, in: 0 }
          // Shift old long gap to the following index (after new drive axle)
          const afterIdx = driveToNewIdx + 1
          const prevAfter = next[afterIdx]
          next[afterIdx] = trailerGap
          // If there was a previous short spacing (e.g., 4 ft between trailer axles) move it one further if free/placeholder
          if (prevAfter && (afterIdx + 1) < needSpacings) {
            const target = afterIdx + 1
            if (next[target] && Number(next[target].ft) === 10 && Number(next[target].in) === 0) {
              next[target] = prevAfter
            } else if (!next[target]) {
              next[target] = prevAfter
            }
          }
        } else if (orig && Number(orig.ft) === 10 && Number(orig.in) === 0) {
          // If placeholder still present just set to 4 ft.
            next[driveToNewIdx] = { ft: 4, in: 0 }
        }
      } else if (unit1Axles >= 4) {
        // No trailer, just ensure internal spacing default if placeholder.
        const idx = 2
        if (next[idx] && Number(next[idx].ft) === 10 && Number(next[idx].in) === 0) next[idx] = { ft: 4, in: 0 }
      }

      // Default internal trailer (Unit 2) spacings (excluding the Unit1→Unit2 transition gap) to 4 ft.
      if (unit2Axles > 1) {
        const jeepCount = equipment === 'jeep' ? jeepAxles : 0
        const transitionIdx = (unit1Axles + jeepCount) - 1 // spacing index where trailer begins
        const trailerStartAxle = unit1Axles + jeepCount + 1
        const internalStartIdx = trailerStartAxle - 1 // first spacing wholly inside trailer group
        const internalCount = unit2Axles - 1
        for (let k = 0; k < internalCount; k++) {
          const si = internalStartIdx + k
          if (si === transitionIdx) continue
            if (si < next.length) {
              const val = next[si]
              if (!val) continue
              // If placeholder (10') or an unintended long gap (>=20') inside trailer, set to 4'.
              if ((Number(val.ft) === 10 && Number(val.in) === 0) || Number(val.ft) >= 20) {
                next[si] = { ft: 4, in: 0 }
              }
            }
        }
        // Ensure the transition gap remains long (preserve if already long). If it's placeholder 10' and we have a known long gap stored elsewhere, leave for user; otherwise leave as is.
      }
      return next
    })
    setAxleWeights(prev => {
      const next = prev.slice(0, desired)
      while (next.length < desired) next.push(0)
      return next
    })
  }, [unit1Axles, unit2Axles, equipment, jeepAxles, boosterAxles, flipAxles, axles])

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

  // Segment definitions for diagram (tractor = unit1, optional jeep, trailer = unit2, booster, flip)
  const diagramSegments = useMemo(() => {
    const segs = []
    if (unit1Axles) segs.push({ label: 'Unit 1 (Tractor)', count: unit1Axles, color: '#5ab2ff18' })
    if (equipment === 'jeep' && jeepAxles) segs.push({ label: 'Jeep', count: jeepAxles, color: '#34d39918' })
    if (unit2Axles) segs.push({ label: 'Unit 2 (Trailer)', count: unit2Axles, color: '#ffd84d18' })
    if (equipment === 'booster' && boosterAxles) segs.push({ label: 'Booster', count: boosterAxles, color: '#ff8ab718' })
    if (equipment === 'flip' && flipAxles) segs.push({ label: 'Flip', count: flipAxles, color: '#c084fc18' })
    return segs
  }, [unit1Axles, unit2Axles, equipment, jeepAxles, boosterAxles, flipAxles])

  const spacingLabel = (i) => {
    const left = i + 1, right = i + 2
  if (left === 1) return `Steering to Axle 2 (ft/in)`
  return `Axle ${left} to Axle ${right} (ft/in)`
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
      <header className="wc-header">
        <div className="wc-title"><span className="wc-dot" aria-hidden></span><h2>Advanced Axle Group & Bridge Calculator</h2></div>
        <p className="wc-sub">Select axle count, then enter spacings and per-axle weights. Checks single axles, tandems, all groups, and GVW.</p>
      </header>
      <div className="wc-controls">
  {/** Total units (auto or manual override). Auto counts tractor + optional jeep + trailer + booster/flip. Manual allows 1–5 for special cases (e.g., multi-trailer piggyback). */}
  {(() => {
    const autoUnits = 1 + (equipment === 'jeep' ? 1 : 0) + (unit2Axles > 0 ? 1 : 0) + (equipment === 'booster' ? 1 : 0) + (equipment === 'flip' ? 1 : 0)
    const displayVal = manualUnits === null ? 'auto' : String(manualUnits)
    return (
      <div className="ctrl">
        <label>Total units {manualUnits === null && <span style={{fontWeight:400, fontSize:'.7rem', marginLeft:4}}>(auto)</span>}</label>
        <select aria-label="Total units (auto or override)" value={displayVal} onChange={(e)=>{ const v=e.target.value; if(v==='auto'){ setManualUnits(null); } else { const num=Number(v); if(num>=1 && num<=5) setManualUnits(num); } }}>
          <option value="auto">Auto: {autoUnits}</option>
          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
    )
  })()}
  <div className="ctrl"><label>Unit 1 axles touching the ground</label><select value={unit1Axles} onChange={(e)=>{const val=Math.min(5, Math.max(1, Number(e.target.value))); setUnit1Axles(val);}}>{Array.from({ length: 5 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}</select></div>
  <div className="ctrl"><label>Unit 2 axles touching the ground</label><select value={unit2Axles} onChange={(e)=>{const val=Math.min(5, Math.max(0, Number(e.target.value))); setUnit2Axles(val);}}>{Array.from({ length: 6 }, (_, i) => i).map(n => <option key={n} value={n}>{n}</option>)}</select></div>
        <div className="ctrl"><label>Total axles (auto)</label><input type="number" value={axles} disabled aria-label="Total axles automatically calculated" /></div>
        {/* Second row: overall length & load width all inline (4 controls) */}
        <div className="full-row wc-inline-four">
          <div className="ctrl"><label>Overall length (ft)</label><input type="number" min={0} step={1} value={overallLength.ft} onChange={(e)=>setOverallLength(v=>({...v, ft:Number(e.target.value)||0}))} /></div>
          <div className="ctrl"><label>Overall length (in)</label><input type="number" min={0} max={11} step={1} value={overallLength.in} onChange={(e)=>setOverallLength(v=>({...v, in:Number(e.target.value)||0}))} /></div>
          <div className="ctrl"><label>Load width (ft)</label><input type="number" min={0} step={1} value={loadWidth.ft} onChange={(e)=>setLoadWidth(v=>({...v, ft:Number(e.target.value)||0}))} /></div>
          <div className="ctrl"><label>Load width (in)</label><input type="number" min={0} max={11} step={1} value={loadWidth.in} onChange={(e)=>setLoadWidth(v=>({...v, in:Number(e.target.value)||0}))} /></div>
        </div>
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
          {equipment === 'booster' && (
            <div className="wc-jeep-config">
              <label>Booster axles
                <select value={boosterAxles} onChange={(e)=>setBoosterAxles(Math.min(3, Math.max(1, Number(e.target.value))))}>
                  {[1,2,3].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </label>
              <p className="wc-note-jeep">Booster: 1–3 axle group attached to rear of trailer to add axles and lengthen group for Bridge Formula.</p>
            </div>
          )}
          {equipment === 'flip' && (
            <div className="wc-jeep-config">
              <label>Flip axle(s)
                <select value={flipAxles} onChange={(e)=>setFlipAxles(Math.min(2, Math.max(1, Number(e.target.value))))}>
                  {[1,2].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </label>
              <p className="wc-note-jeep">Flip axle: 1–2 axle add-on hinged at trailer rear; flips down to increase axle count when needed.</p>
            </div>
          )}
        </div>
      </div>
      <div className="wc-card">
        <h3>Axle Diagram (live)</h3>
        <AxleDiagram spacings={spacings} totalAxles={axles} segments={diagramSegments} />
      </div>
  <div className="wc-section"><div className="wc-h3">Measure between axles (center of hub to center of hub)</div><div className="wc-grid-3 wc-spacing-grid">{spacings.map((s, i) => (<div className="ctrl" key={i}><label>{spacingLabel(i)}</label><div className="wc-duo"><input type="number" min={0} step={1} value={s.ft} placeholder="ft" aria-label={`${spacingLabel(i)} feet`} onChange={(e)=>{const v=[...spacings]; v[i]={...v[i], ft:Number(e.target.value)||0}; setSpacings(v)}} /><input type="number" min={0} max={11} step={1} value={s.in} placeholder="in" aria-label={`${spacingLabel(i)} inches`} onChange={(e)=>{const v=[...spacings]; v[i]={...v[i], in:Number(e.target.value)||0}; setSpacings(v)}} /></div></div>))}</div></div>
      <div className="wc-section"><div className="wc-h3">Per-axle weights (lb)</div><div className="wc-grid-5">{axleWeights.map((w, i) => (<div className="ctrl" key={i}><label>Axle {i+1}</label><input type="number" min={0} step={100} value={w} onChange={(e)=>{const v=[...axleWeights]; v[i]=Number(e.target.value)||0; setAxleWeights(v)}} /></div>))}</div></div>
      <div className="wc-kpis"><div className="k"><div className="small">GVW</div><div className="v">{fmt(gvw)} lb</div></div><div className="k"><div className="small">GVW Limit</div><div className="v">{fmt(FEDERAL_LIMITS.gross)} lb</div></div><div className="k"><div className="small">Outer Group W (1→{axles})</div><div className="v">{fmt(outerGroup?.W)} lb</div></div><div className={`badge ${overallPass ? 'ok' : 'warn'}`}>{overallPass ? 'Overall: PASS' : 'Overall: ATTENTION'}</div></div>
      <div className="wc-card"><h3>Single-Axle Checks</h3><div className="wc-table-wrap"><table className="wc-table"><thead><tr><th>Axle</th><th>Weight</th><th>Limit</th><th>Status</th></tr></thead><tbody>{singleAxle.map((s, i) => (<tr key={i}><td>{i+1}</td><td>{fmt(s.actual)} lb</td><td>{fmt(s.limit)} lb</td><td><span className={`pill ${s.actual <= s.limit ? 'ok' : 'bad'}`}>{s.actual <= s.limit ? 'OK' : 'OVER'}</span></td></tr>))}</tbody></table></div></div>
      <div className="wc-card"><h3>Tandem Checks (40"–96")</h3><div className="wc-table-wrap"><table className="wc-table"><thead><tr><th>Pair</th><th>Spacing (in)</th><th>Total</th><th>Limit</th><th>Status</th></tr></thead><tbody>{tandems.map((t, i) => (<tr key={i}><td>{t.a1}–{t.a2}</td><td>{t.inches}</td><td>{fmt(t.actual)} lb</td><td>{t.limit ? fmt(t.limit) + ' lb' : 'n/a'}</td><td><span className={`pill ${t.limit === null ? 'na' : (t.pass ? 'ok' : 'bad')}`}>{t.limit === null ? 'n/a' : (t.pass ? 'OK' : 'OVER')}</span></td></tr>))}</tbody></table></div></div>
      <div className="wc-card"><h3>Bridge Formula – All Consecutive Groups</h3><div className="wc-table-wrap"><table className="wc-table"><thead><tr><th>Group</th><th>N</th><th>L (ft)</th><th>W (limit)</th><th>Actual</th><th>Status</th></tr></thead><tbody>{groups.map((g, idx) => (<tr key={idx}><td>{g.i}→{g.j}</td><td>{g.N}</td><td>{g.L.toFixed(2)}</td><td>{fmt(g.W)} lb</td><td>{fmt(g.actual)} lb</td><td><span className={`pill ${g.pass ? 'ok' : 'bad'}`}>{g.pass ? 'OK' : 'OVER'}</span></td></tr>))}</tbody></table></div></div>
      <p className="wc-note"><strong>Note:</strong> This tool aids planning. Always verify posted limits, permits, and state statutes. Oversize/overweight loads may require escorts, signage, and route approvals.</p>
    </section>
  )
}
