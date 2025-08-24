import React, { useMemo } from 'react'

// Utility to format a distance in feet (floating) into feet/inches string (e.g., 12.33 -> 12' 4")
function fmtFeet(ft) {
  const n = Number(ft || 0)
  const inches = Math.round((n % 1) * 12)
  const whole = Math.floor(n)
  return `${whole}′ ${inches}″`
}

/**
 * AxleDiagram
 * Props:
 *  - spacings: Array<{ ft:number, in:number }> consecutive center-to-center spacings
 *  - segments: [{ label:string, count:number, color?:string }]
 *  - totalAxles: number
 */
export default function AxleDiagram({ spacings, segments, totalAxles }) {
  const positionsFt = useMemo(() => {
    const p = [0]
    for (let i = 0; i < totalAxles - 1; i++) {
      const s = spacings[i]
      const val = (Number(s?.ft) || 0) + (Number(s?.in) || 0) / 12
      p.push(p[i] + val)
    }
    return p
  }, [spacings, totalAxles])

  const totalFt = positionsFt.length ? positionsFt[positionsFt.length - 1] : 0

  // Normalize segments → ensure counts add up (soft safeguard; we trust caller but cap)
  const segs = useMemo(() => {
    if (!segments?.length) return [{ label: 'Combination', count: totalAxles, color: '#ffffff10' }]
    const out = []
    let consumed = 0
    for (const s of segments) {
      if (consumed >= totalAxles) break
      const remaining = totalAxles - consumed
      const count = Math.min(Math.max(0, s.count || 0), remaining)
      out.push({ label: s.label, count, color: s.color || '#ffffff10' })
      consumed += count
    }
    return out
  }, [segments, totalAxles])

  const vw = 960
  const vh = 240
  const margin = { l: 40, r: 20, t: 34, b: 60 }
  const innerW = vw - margin.l - margin.r
  const baseY = vh - margin.b
  const pxPerFt = totalFt > 0 ? innerW / totalFt : 12
  const axleR = 8
  const x = (ft) => margin.l + ft * pxPerFt

  // Derive segment index boundaries
  const segBoundaries = []
  let cursor = 0
  segs.forEach((s) => {
    const startIdx = cursor
    const endIdx = cursor + s.count - 1
    segBoundaries.push({ ...s, startIdx, endIdx })
    cursor += s.count
  })

  return (
    <div className="wc-axle-diagram" aria-label="Axle spacing visual diagram">
      <svg viewBox={`0 0 ${vw} ${vh}`} className="wc-axle-svg" role="img" aria-hidden={false}>
        <defs>
          <marker id="wcArrowHead" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
            <path d="M0,0 L10,4 L0,8 z" fill="currentColor" />
          </marker>
          <marker id="wcArrowTail" markerWidth="10" markerHeight="8" refX="1" refY="4" orient="auto">
            <path d="M10,0 L0,4 L10,8 z" fill="currentColor" />
          </marker>
        </defs>
        {segBoundaries.map((s, i) => {
          if (s.startIdx >= positionsFt.length) return null
          const x1 = x(positionsFt[s.startIdx]) - 10
          const x2 = x(positionsFt[Math.min(s.endIdx, positionsFt.length - 1)]) + 10
          return (
            <g key={i}>
              <rect x={x1} y={margin.t} width={Math.max(0, x2 - x1)} height={vh - margin.t - 90} fill={s.color} rx={8} />
              <text x={x1 + 6} y={margin.t - 10} fontSize="12" fill="#cfe0ff">{s.label}</text>
            </g>
          )
        })}
        <line x1={margin.l - 10} y1={baseY} x2={vw - margin.r + 10} y2={baseY} stroke="#ffffff30" strokeWidth="2" />
        {positionsFt.map((p, idx) => (
          <g key={idx}>
            <circle cx={x(p)} cy={baseY} r={axleR} fill="#ffd84d" stroke="#0006" />
            <text x={x(p)} y={baseY + 24} textAnchor="middle" fontSize="12" fill="#e6eefc">{idx + 1}</text>
          </g>
        ))}
        {positionsFt.slice(0, -1).map((p, i) => {
          const p2 = positionsFt[i + 1]
          const mid = (p + p2) / 2
          const y = baseY - 28
          return (
            <g key={`dim-${i}`} color="#fff">
              <line x1={x(p)} y1={y} x2={x(p2)} y2={y} stroke="currentColor" strokeWidth={1.5} markerStart="url(#wcArrowTail)" markerEnd="url(#wcArrowHead)" />
              <text x={x(mid)} y={y - 6} textAnchor="middle" fontSize="12" fill="currentColor">{fmtFeet(p2 - p)}</text>
            </g>
          )
        })}
        {totalFt > 0 && (
          <g color="#cbd5e1">
            <line x1={margin.l} y1={baseY - 74} x2={margin.l + innerW} y2={baseY - 74} stroke="currentColor" strokeDasharray="4 4" markerStart="url(#wcArrowTail)" markerEnd="url(#wcArrowHead)" />
            <text x={margin.l + innerW / 2} y={baseY - 84} textAnchor="middle" fontSize="12" fill="#cfe0ff">Overall axle span: {fmtFeet(totalFt)}</text>
          </g>
        )}
      </svg>
      <div className="wc-axle-legend"><span className="wc-axle-dot" /> Axle centers • Spacings are center-to-center.</div>
    </div>
  )
}
