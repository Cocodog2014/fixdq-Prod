import React, { useEffect, useMemo, useState } from 'react'
import GlobalHeader from '../../components/GlobalHeader'

// Local storage key
const LOCAL_KEY = 'pretrip_inspection_v1'

// Checklist template
const CHECKLIST = [
  {
    id: 'info',
    title: 'Vehicle & Driver Info',
    items: [
      { id: 'driver_license', text: "Driver's license/CDL on person" },
      { id: 'medical_card', text: 'Medical certificate (if required)' },
      { id: 'company_id', text: 'Company ID/badge (if required)' },
    ],
  },
  {
    id: 'docs',
    title: 'Credentials & Required Documents (separate items)',
    items: [
      { id: 'ucr', text: 'UCR (Unified Carrier Registration) proof' },
      { id: 'mc_certificate', text: 'Operating authority / MC certificate' },
      { id: 'truck_registration', text: 'Truck registration (cab card)' },
      { id: 'truck_annual', text: 'Truck annual (periodic) inspection proof' },
      { id: 'trailer_registration', text: 'Trailer registration' },
      { id: 'trailer_annual', text: 'Trailer annual inspection proof' },
      { id: 'lease_agreement', text: 'Lease agreement (if applicable)' },
      { id: 'insurance', text: 'Proof of insurance' },
      { id: 'eld_instructions', text: 'ELD instructions card' },
      { id: 'paper_logs', text: 'Paper logs (spare)' },
      { id: 'accident_kit', text: 'Accident kit (forms, contacts)' },
      { id: 'dvir_forms', text: 'DVIR forms or e‑DVIR access' },
      { id: 'permits', text: 'Oversize/overweight permits (if required)' },
    ],
  },
  {
    id: 'cab',
    title: 'Cab Interior & Safety',
    items: [
      { id: 'seatbelt', text: 'Seat belt, seats secure' },
      { id: 'horn', text: 'Horn operational' },
      { id: 'windshield', text: 'Windshield & visibility (no critical cracks)' },
      { id: 'wipers', text: 'Wipers & washers' },
      { id: 'mirrors', text: 'Mirrors adjusted/secure' },
      { id: 'defroster', text: 'Defroster/heater' },
      { id: 'gauges', text: 'Gauges/indicators (check engine/ABS)' },
      { id: 'eld', text: 'ELD/timekeeping operational' },
      { id: 'fire_extinguisher_present', text: 'Fire extinguisher present/charged' },
      { id: 'fire_extinguisher_secured', text: 'Fire extinguisher properly mounted/secured' },
      { id: 'triangles_three', text: 'Warning triangles — 3 present (or equivalent emergency devices)' },
    ],
  },
  {
    id: 'engine',
    title: 'Engine Compartment',
    items: [
      { id: 'fluids', text: 'Fluids: oil, coolant, PS — levels/leaks' },
      { id: 'belts', text: 'Belts/hoses/battery condition' },
      { id: 'leaks', text: 'No leaks under vehicle' },
    ],
  },
  {
    id: 'lights',
    title: 'Lights / Electrical',
    items: [
      { id: 'headlights', text: 'Headlights (hi/lo), DRL' },
      { id: 'signals', text: 'Turn signals/hazards/4‑ways' },
      { id: 'marker_clearance', text: 'Clearance/marker/ID lamps' },
      { id: 'brake_lamps', text: 'Brake lamps/reflectors/license light' },
    ],
  },
  {
    id: 'brakes',
    title: 'Brakes (incl. Air)',
    items: [
      { id: 'service_brake', text: 'Service brake test (rolling)' },
      { id: 'parking_brake', text: 'Parking brake holds' },
      { id: 'trailer_brake', text: 'Trailer brake/hand valve (if equipped)' },
      { id: 'air_checks', text: 'Air: build, cut‑in/out, leak, low‑air warning' },
      { id: 'abs_lamp', text: 'ABS lamp self‑check' },
    ],
  },
  {
    id: 'steer_susp',
    title: 'Steering & Suspension',
    items: [
      { id: 'steering_play', text: 'Steering free play/linkage' },
      { id: 'springs', text: 'Springs/airbags/shocks/U‑bolts' },
    ],
  },
  {
    id: 'tires_wheels',
    title: 'Tires & Wheels',
    items: [
      { id: 'tread', text: 'Tread depth; no exposed cords' },
      { id: 'inflation', text: 'Proper inflation; no cuts/bulges' },
      { id: 'lugs', text: 'Lug nuts/hubs (no looseness/leaks)' },
      { id: 'mudflaps', text: 'Mud flaps/splash guards' },
    ],
  },
  {
    id: 'coupling',
    title: 'Coupling / Connections',
    items: [
      { id: 'fifthwheel', text: '5th wheel/kingpin/jaws/lock handle' },
      { id: 'lines', text: 'Air/electrical lines secure; no leaks/chafing' },
      { id: 'landing_gear', text: 'Landing gear up; handle secure' },
    ],
  },
  {
    id: 'trailer_load',
    title: 'Trailer / Load Securement',
    items: [
      { id: 'doors', text: 'Doors/roof/floor; curtains/tarp' },
      { id: 'securement', text: 'Cargo securement; straps/chains/edge guards' },
  { id: 'tandem_lock_pins', text: 'Trailer tandem slider locking pins engaged; release handle secured' },
      { id: 'width_length', text: 'Width/length/height within limits (permits if needed)' },
    ],
  },
  {
    id: 'osow',
    title: 'Oversize/Overweight (if applicable)',
    items: [
  { id: 'os_banners', text: 'OVERSIZE LOAD banners/signs mounted front & rear per permit', info: 'Typically required when load exceeds legal width; placement, size, and color are specified by your state permit. Ensure banners are secured and not obscured.' },
  { id: 'os_flags', text: 'Red/orange warning flags on extremities/corners as required', info: 'Flags are commonly required on projecting extremities (width/overhang). Use high‑visibility red/orange flags at the outermost points as directed by the permit.' },
  { id: 'os_lights', text: 'Amber rotating/flashing beacons and/or warning lights operational as required', info: 'Amber beacons or flashing warning lights may be required during travel (daylight or nighttime) depending on width/length and state rules. Verify they are visible and functioning.' },
  { id: 'os_escort', text: 'Escort/pilot vehicles, signage, and communications set per permit (if required)', info: 'Escort (pilot) vehicles are required above certain width/length/route thresholds. Ensure required signage, height pole (if applicable), and radio comms are in place per the permit.' },
  { id: 'os_restrictions', text: 'Route and travel restrictions per permit (times, weather, bridges) reviewed', info: 'Review permit for authorized route, curfews, holiday/time‑of‑day limits, bridge restrictions, speed limits, and wind/weather limits. Carry permit and comply at all times.' },
    ],
  },
  {
    id: 'walkaround',
    title: 'Final Walkaround',
    items: [
      { id: 'leaks_walk', text: 'No fresh leaks under vehicle' },
      { id: 'body_damage', text: 'No unsafe body damage; fuel cap secured' },
    ],
  },
]

// Utilities
function load() { try { const raw = localStorage.getItem(LOCAL_KEY); return raw ? JSON.parse(raw) : null } catch { return null } }
function save(s) { try { localStorage.setItem(LOCAL_KEY, JSON.stringify(s)) } catch { } }
function downloadJSON(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function PreTrip({ orgName = 'Company' }) {
  // Header fields
  const [driver, setDriver] = useState(load()?.driver || '')
  const [unit, setUnit] = useState(load()?.unit || '')
  const [trailer, setTrailer] = useState(load()?.trailer || '')
  const [odometer, setOdometer] = useState(load()?.odometer || '')
  const [location, setLocation] = useState(load()?.location || '')
  const [dt, setDt] = useState(load()?.dt || new Date().toISOString().slice(0, 16)) // YYYY-MM-DDTHH:mm
  const [signature, setSignature] = useState(load()?.signature || '')

  // Accordion open state
  const [open, setOpen] = useState(load()?.open || CHECKLIST.map((sec) => sec.id)) // open all by default

  // Answers: { [itemKey]: { status: 'ok'|'defect'|'na', note?: string } }
  const [answers, setAnswers] = useState(load()?.answers || {})
  const [infoOpen, setInfoOpen] = useState({})

  // Persist
  useEffect(() => {
    save({ driver, unit, trailer, odometer, location, dt, signature, open, answers })
  }, [driver, unit, trailer, odometer, location, dt, signature, open, answers])

  function setStatus(itemKey, status) { setAnswers((prev) => ({ ...prev, [itemKey]: { ...(prev[itemKey] || {}), status } })) }
  function setNote(itemKey, note) { setAnswers((prev) => ({ ...prev, [itemKey]: { ...(prev[itemKey] || {}), note } })) }

  function toggleOpen(id) { setOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])) }
  function expandAll() { setOpen(CHECKLIST.map((s) => s.id)) }
  function collapseAll() { setOpen([]) }
  function reset() { localStorage.removeItem(LOCAL_KEY); window.location.reload() }

  const flatItems = useMemo(() => CHECKLIST.flatMap((sec) => sec.items.map((it) => ({ ...it, section: sec.title, key: `${sec.id}.${it.id}` }))), [])
  const defects = flatItems.filter((i) => answers[i.key]?.status === 'defect')
  const okCount = flatItems.filter((i) => answers[i.key]?.status === 'ok').length
  const naCount = flatItems.filter((i) => answers[i.key]?.status === 'na').length

  function exportJSON() {
    const data = { kind: 'pretrip', orgName, driver, unit, trailer, odometer, location, dt, signature, answers }
    const fname = `pretrip_${unit || 'unit'}_${new Date().toISOString().slice(0, 10)}.json`
    downloadJSON(fname, data)
  }

  return (
    <div className="vehicle-inspections-page">
      <GlobalHeader />
      <section className="section-padding">
        <div className="container">
          <section className="pt-wrap">
            <div className="pt-title">Pre‑Trip Inspection</div>
            <div className="pt-sub">Mobile‑friendly checklist · Saves locally · Print/Export for records</div>

            {/* Header card */}
            <div className="card">
              <div className="grid-2">
                <div className="ctrl"><label>Driver</label><input value={driver} onChange={(e) => setDriver(e.target.value)} placeholder="Name" /></div>
                <div className="ctrl"><label>Vehicle / Unit #</label><input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="e.g., Tractor 123" /></div>
                <div className="ctrl"><label>Trailer # (if any)</label><input value={trailer} onChange={(e) => setTrailer(e.target.value)} placeholder="e.g., Trailer 456" /></div>
                <div className="ctrl"><label>Odometer</label><input value={odometer} onChange={(e) => setOdometer(e.target.value)} inputMode="numeric" placeholder="Miles" /></div>
                <div className="ctrl"><label>Location</label><input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City / Yard / Milepost" /></div>
                <div className="ctrl"><label>Date & Time</label><input type="datetime-local" value={dt} onChange={(e) => setDt(e.target.value)} /></div>
              </div>
              <div className="btns">
                <button className="btn" onClick={expandAll}>Expand All</button>
                <button className="btn" onClick={collapseAll}>Collapse All</button>
                <button className="btn" onClick={() => window.print()}>Print / Save PDF</button>
                <button className="btn" onClick={exportJSON}>Export JSON</button>
                <button className="btn" onClick={reset}>Reset</button>
              </div>
            </div>

            {/* Summary */}
            <div className="card" style={{ marginTop: '.8rem' }}>
              <div className="summary">
                <div>
                  <div className="muted">Overall</div>
                  <div style={{ display: 'flex', gap: '.4rem', marginTop: '.35rem', flexWrap: 'wrap' }}>
                    <span className="badge ok">OK: {okCount}</span>
                    <span className="badge bad">DEFECTS: {defects.length}</span>
                    <span className="badge" style={{ background: 'rgba(255,255,255,.08)', border: '1px solid var(--line)' }}>N/A: {naCount}</span>
                  </div>
                </div>
                <div>
                  <div className="muted">Signature (type your name)</div>
                  <div className="ctrl"><input value={signature} onChange={(e) => setSignature(e.target.value)} placeholder="Driver signature" /></div>
                </div>
              </div>
            </div>

            {/* Sections */}
            {CHECKLIST.map((section) => (
              <div key={section.id} className="section">
                <div className="accordion">
                  <div className="acc-head" onClick={() => toggleOpen(section.id)}>
                    <div className="acc-title">{section.title}</div>
                    <div className="muted">{open.includes(section.id) ? 'Hide' : 'Show'}</div>
                  </div>
                  {open.includes(section.id) && (
                    <div className="acc-body">
                      {section.items.map((item) => {
                        const key = `${section.id}.${item.id}`
                        const state = answers[key]?.status || ''
                        const note = answers[key]?.note || ''
                        const hasInfo = Boolean(item.info)
                        const infoKey = `${key}.__info`
                        const isInfoOpen = !!infoOpen[infoKey]
                        return (
                          <div key={key} className="item">
                            <div>
                              <div style={{display:'flex', alignItems:'center', gap:'.35rem'}}>
                                <span>{item.text}</span>
                                {hasInfo && (
                                  <button type="button" className="info-btn" aria-expanded={isInfoOpen} aria-label="More info"
                                    onClick={()=>setInfoOpen(prev=>({...prev, [infoKey]: !prev[infoKey]}))}>
                                    i
                                  </button>
                                )}
                              </div>
                              {hasInfo && isInfoOpen && (
                                <div className="info-panel">
                                  {item.info}
                                </div>
                              )}
                              {state === 'defect' && (
                                <div className="ctrl" style={{ marginTop: '.4rem' }}>
                                  <label className="muted">Describe defect / corrective action</label>
                                  <textarea rows={2} value={note} onChange={(e) => setNote(key, e.target.value)} placeholder="Notes..." />
                                </div>
                              )}
                            </div>
                            <div className="seg" role="group" aria-label="Status selector">
                              <button type="button" aria-pressed={state === 'ok'} onClick={() => setStatus(key, 'ok')}>OK</button>
                              <button type="button" aria-pressed={state === 'defect'} onClick={() => setStatus(key, 'defect')}>Defect</button>
                              <button type="button" aria-pressed={state === 'na'} onClick={() => setStatus(key, 'na')}>N/A</button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-sub" style={{ marginTop: '.9rem' }}>
              <strong>Reminder:</strong> This checklist is a planning aid. Always follow your company policy and current FMCSA/state rules. Record any defects on your DVIR as required and address before operating.
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
