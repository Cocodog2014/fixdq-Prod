import React, { useEffect, useMemo, useState } from 'react'

const DOWN_TO_500 = (x) => Math.floor(x / 500) * 500
function bridgeLimit({ N, Lft, isTotalGroup }) {
  if (N <= 0) return 0
  if (N === 1) return 20000
  const raw = 500 * ((Lft * N) / (N - 1) + 12 * N + 36)
  let limit = DOWN_TO_500(raw)
  if (N === 2) limit = Math.min(limit, 34000)
  if (isTotalGroup) limit = Math.min(limit, 80000)
  return limit
}
function sum(arr, a, b) { let s = 0; for (let i = a; i <= b; i++) s += Number(arr[i] || 0); return s }
function buildPositions(spacingFt, nAxles) { const pos = Array(nAxles).fill(0); for (let i = 1; i < nAxles; i++) pos[i] = pos[i-1] + Number(spacingFt[i-1]||0); return pos }

export default function BridgePlanner() {
  const [nAxles, setNAxles] = useState(5)
  const [spacingFt, setSpacingFt] = useState([12,4,28,5])
  const [axleW, setAxleW] = useState([12000,17000,17000,17000,17000])
  const [roundMode] = useState('down500')

  useEffect(()=>{
    setSpacingFt(a=>{ const next=a.slice(0, Math.max(0,nAxles-1)); while(next.length<nAxles-1) next.push(10); return next })
    setAxleW(w=>{ const next=w.slice(0,nAxles); while(next.length<nAxles) next.push(0); return next })
  },[nAxles])

  const positions = useMemo(()=> buildPositions(spacingFt, nAxles), [spacingFt,nAxles])
  const groups = useMemo(()=>{ const out=[]; for(let i=0;i<nAxles;i++){ for(let j=i;j<nAxles;j++){ const N=j-i+1; const Lft=i===j?0:positions[j]-positions[i]; const isTotal=i===0 && j===nAxles-1; const limit=bridgeLimit({N,Lft,isTotalGroup:isTotal}); const actual=sum(axleW,i,j); out.push({ key:`${i+1}-${j+1}`, i,j,N,Lft,limit,actual }) } } return out },[nAxles,positions,axleW])
  const singles = groups.filter(g=>g.N===1)
  const tandems = groups.filter(g=>g.N===2)
  const allGroups = groups.filter(g=>g.N>=2)
  const gross = useMemo(()=> axleW.reduce((a,b)=>a+Number(b||0),0), [axleW])
  const worstOver = useMemo(()=> Math.max(0,...groups.map(g=> (g.actual||0)-(g.limit||0))), [groups])

  return (
    <div className="bp-wrap">
      <div className="bp-controls">
        <div className="bp-row"><label>Axles</label><input type="number" min={1} max={13} value={nAxles} onChange={e=>setNAxles(Math.max(1,Math.min(13,Number(e.target.value))))} /></div>
        <div className="bp-row"><label>Rounding</label><select value={roundMode} readOnly><option value="down500">Down to nearest 500 lb</option></select></div>
        <div className="bp-hint">Center-to-center distances (ft, decimals ok).</div>
      </div>
      <div className="card"><h3>Axles & Spacing</h3><div className="bp-grid hdr"><div>#</div><div>Spacing to next (ft)</div><div>Axle weight (lb)</div><div>Position (ft)</div></div>{Array.from({length:nAxles}).map((_,idx)=>(<div className="bp-grid" key={idx}><div data-label="#">{idx+1}</div><div data-label="Spacing to next (ft)">{idx<nAxles-1?(<input type="number" step="0.01" min="0" inputMode="decimal" value={spacingFt[idx]} onChange={e=>{const v=e.target.value===""?"":Number(e.target.value); const next=spacingFt.slice(); next[idx]=v; setSpacingFt(next)}} />):(<span className="muted">—</span>)}</div><div data-label="Axle weight (lb)"><input type="number" step="100" min="0" inputMode="numeric" value={axleW[idx]} onChange={e=>{const v=e.target.value===""?"":Number(e.target.value); const next=axleW.slice(); next[idx]=v; setAxleW(next)}} /></div><div data-label="Position (ft)">{positions[idx].toFixed(2)}</div></div>))}</div>
      <div className="card"><h3>Single-Axle Checks</h3><div className="bp-grid hdr"><div>Axle</div><div>Limit</div><div>Actual</div><div>Status</div></div>{singles.map((g,k)=>(<div className="bp-grid" key={k}><div data-label="Axle">{g.key}</div><div data-label="Limit">{g.limit.toLocaleString()}</div><div data-label="Actual">{g.actual.toLocaleString()}</div><div data-label="Status"><StatusCell limit={g.limit} actual={g.actual} /></div></div>))}</div>
      <div className="card"><h3>Tandem Checks (2-axle groups)</h3><div className="bp-grid hdr"><div>Group</div><div>Span L (ft)</div><div>Limit</div><div>Actual</div><div>Status</div></div>{tandems.map((g,k)=>(<div className="bp-grid" key={k}><div data-label="Group">{g.key}</div><div data-label="Span L (ft)">{g.Lft.toFixed(2)}</div><div data-label="Limit">{g.limit.toLocaleString()}</div><div data-label="Actual">{g.actual.toLocaleString()}</div><div data-label="Status"><StatusCell limit={g.limit} actual={g.actual} /></div></div>))}</div>
      <div className="card"><h3>Bridge Formula — All Consecutive Groups</h3><div className="bp-grid hdr"><div>Group</div><div>N</div><div>L (ft)</div><div>Limit</div><div>Actual</div><div>Status</div></div>{allGroups.map((g,k)=>(<div className="bp-grid" key={k}><div data-label="Group">{g.key}</div><div data-label="N">{g.N}</div><div data-label="L (ft)">{g.Lft.toFixed(2)}</div><div data-label="Limit">{g.limit.toLocaleString()}</div><div data-label="Actual">{g.actual.toLocaleString()}</div><div data-label="Status"><StatusCell limit={g.limit} actual={g.actual} /></div></div>))}</div>
      <p className="legal-note">Federal limits only (20k single, 34k tandem, Bridge Formula with 80k gross cap). Verify state / permitted allowances.</p>
      <div className="sticky-summary"><div>Gross: {gross.toLocaleString()} / 80,000</div><div className={worstOver>0?"bad":"ok"}>{worstOver>0?`Over +${worstOver.toLocaleString()} lb`:'All groups OK'}</div><button className="btn btn-sm" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Top</button></div>
    </div>
  )
}

function StatusCell({ limit, actual }) { if (!actual) return <div className="muted">—</div>; const ok = actual <= limit; const diff = Math.abs(limit - actual); return <div className={ok?"ok":"bad"}>{ok?"OK":`Over by ${diff.toLocaleString()} lb`}</div> }
