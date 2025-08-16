import React, { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import GlobalHeader from '../../components/GlobalHeader'

const LOCAL_KEY = 'roadside_flow_v1'

function load() { try { const raw = localStorage.getItem(LOCAL_KEY); return raw ? JSON.parse(raw) : null } catch { return null } }
function save(s) { try { localStorage.setItem(LOCAL_KEY, JSON.stringify(s)) } catch { } }
function downloadJSON(filename, data) { const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url) }

// Master steps library
const LIB = [
  { id:'observe', title:'Observation & Safe Stop', levels:['I','II','III','V','VI'], tags:['all'], inspector:['Selects vehicle; observes seatbelt, lane use, equipment condition'], driver:['Pull over safely; set parking brake; follow instructions'], docs:[] },
  { id:'intro', title:'Initial Contact & Interview', levels:['I','II','III','V','VI'], tags:['all'], inspector:['Introduces self; states reason; explains inspection level'], driver:['Be prepared to state origin/destination, cargo, HAZMAT if any'], docs:[] },
  { id:'english', title:'English Proficiency (Interview & Communications)', levels:['I','II','III','VI'], tags:['driver','doc'], inspector:['Assesses ability to understand and respond in English to safety/route questions.','May request reading a posted/regulatory sign or a line from shipping papers.','May ask for a short written statement or ELD annotation (e.g., malfunction note).'], driver:['Answer questions in English (origin/destination/cargo, HOS, permits).','Demonstrate ability to read common signs/notations if asked.','Write a brief note/annotation if requested; operate ELD/transfer logs; follow written instructions.'], docs:['ELD instruction card (English)','Shipping papers comprehension (if HM)'] },
  { id:'cdl_med', title:'CDL & Medical', levels:['I','II','III','VI'], tags:['doc','driver'], inspector:['Checks CDL class/endorsements/restrictions; verifies medical'], driver:['Provide CDL & med card (if applicable)'], docs:['CDL','Med card or MVR med status'] },
  { id:'hos', title:'HOS/ELD Records', levels:['I','II','III','VI'], tags:['doc','driver'], inspector:['Reviews RODS/ELD, unassigned driving, edits/annotations, supporting docs'], driver:['Know malfunction steps; retrieve last 7/8 days'], docs:['ELD display/transfer','Supporting docs'] },
  { id:'carrier_ids', title:'Carrier & Vehicle Identification', levels:['I','II','III','V','VI'], tags:['doc','driver'], inspector:['USDOT/MC, UCR, registrant; plates/VIN'], driver:['Provide carrier info'], docs:['UCR proof','Operating authority (if for‑hire)'] },
  { id:'lighting', title:'Lighting & Reflectors', levels:['I','II','V','VI'], tags:['vehicle'], inspector:['Checks headlamps, turn signals, 4‑ways, ID/marker/brake/plate'], driver:['Operate switches on request'], docs:[] },
  { id:'tires_wheels', title:'Tires, Wheels & Rims', levels:['I','II','V','VI'], tags:['vehicle'], inspector:['Tread, inflation, damage; loose/missing lugs; leaks at hubs'], driver:['Chock as instructed'], docs:[] },
  { id:'steer_susp', title:'Steering & Suspension', levels:['I','II','V','VI'], tags:['vehicle'], inspector:['Free play, components, springs/airbags/shocks'], driver:['Turn wheel / roll as asked'], docs:[] },
  { id:'brakes_visual', title:'Brake Components (Visual)', levels:['I','II','V','VI'], tags:['vehicle'], inspector:['Lines/chambers/slack adjusters; leaks/damage'], driver:['Set/Release per instruction'], docs:[] },
  { id:'air_checks', title:'Air Brake Checks', levels:['I','V','VI'], tags:['vehicle'], inspector:['Build, cut‑in/out, applied leak, low‑air warning; parking brake hold'], driver:['Perform brake tests on command'], docs:[] },
  { id:'coupling', title:'Coupling Devices', levels:['I','II','V','VI'], tags:['vehicle','trailered'], inspector:['5th wheel/kingpin/jaws/lock; lines secured; landing gear'], driver:['Demonstrate tug/visual as requested'], docs:[] },
  { id:'securement', title:'Cargo Securement', levels:['I','II','V','VI'], tags:['vehicle'], inspector:['Devices, working load limits, edge protection, blocking'], driver:['Provide bills or list of commodity if needed'], docs:[] },
  { id:'emerg', title:'Emergency Equipment', levels:['I','II','III','V','VI'], tags:['vehicle'], inspector:['Fire extinguisher charged & secured; three triangles present'], driver:['Show location'], docs:[] },
  { id:'hm_papers', title:'Hazmat Papers & ERI', levels:['I','II','III','V','VI'], tags:['hm'], inspector:['Shipping papers, emergency response info, accessibility'], driver:['Display papers; know emergency actions'], docs:['HM shipping papers','Emergency response info'] },
  { id:'hm_placard', title:'Placards/Labels/Markings', levels:['I','II','V','VI'], tags:['hm'], inspector:['Correct class/quantity; placement/visibility'], driver:['Walk around with inspector if asked'], docs:[] },
  { id:'hm_contain', title:'Packages/Containment', levels:['I','II','V','VI'], tags:['hm'], inspector:['No leaks/damage; upright; segregation as required'], driver:['Answer commodity questions'], docs:[] },
  { id:'ct_spec', title:'Cargo Tank ID & Test Dates', levels:['I','II','V','VI'], tags:['cargo_tank'], inspector:['Spec plate; required test/inspection dates (V,K,P,I,etc.)'], driver:['Show documentation'], docs:['CT test/inspection proofs'] },
  { id:'ct_fittings', title:'Valves/Fittings/Closures', levels:['I','II','V','VI'], tags:['cargo_tank'], inspector:['No leaks; closures secure; PRDs intact'], driver:['Operate only if asked'], docs:[] },
  { id:'ct_shutdown', title:'Emergency Shutoffs', levels:['I','II','V','VI'], tags:['cargo_tank'], inspector:['Remote/thermal/electrical shutoffs function'], driver:['Identify locations'], docs:[] },
  { id:'obp_mark', title:'OBP Markings & Closures', levels:['I','II','V','VI'], tags:['obp'], inspector:['UN#/proper name/PG; closures secured'], driver:['Provide papers/ids'], docs:[] },
  { id:'obp_secure', title:'OBP Securement & Condition', levels:['I','II','V','VI'], tags:['obp'], inspector:['Blocking/strapping intact; no leaks/damage'], driver:['Assist as requested'], docs:[] },
  { id:'pc_pass', title:'Passenger Safety Items', levels:['I','II','V'], tags:['passenger'], inspector:['Emergency exits, aisle clearance, seating secure'], driver:['Demonstrate exit operation'], docs:[] },
  { id:'pc_equip', title:'Passenger Equipment', levels:['I','II','V'], tags:['passenger'], inspector:['Extinguisher/first aid/spare fuses/triangles'], driver:['Show locations'], docs:[] },
  { id:'rad_docs', title:'RAD/HRCQ Papers & Route Plan', levels:['VI'], tags:['rad6'], inspector:['Verifies documentation, routing, special requirements'], driver:['Provide plan & comms readiness'], docs:['RAD shipping papers','Route plan'] },
  { id:'rad_security', title:'Security/Attendance Checks', levels:['VI'], tags:['rad6'], inspector:['Attendance/security compliance; communications'], driver:['Demonstrate procedures'], docs:[] },
  { id:'defects_eval', title:'Defect Severity / Out‑of‑Service Decisions', levels:['I','II','III','V','VI'], tags:['all'], inspector:['Explains violations or OOS determinations'], driver:['Understand requirements before release'], docs:[] },
  { id:'report_review', title:'Inspection Report Review & Signatures', levels:['I','II','III','V','VI'], tags:['all'], inspector:['Reviews findings; provides report; obtains driver signature'], driver:['Review, ask questions, sign/receive copy'], docs:[] },
  { id:'decal', title:'CVSA Decal (if applicable)', levels:['I','V'], tags:['all'], inspector:['Affixes decal if qualified'], driver:['Note expiration window'], docs:[] },
  { id:'release', title:'Return Documents & Release', levels:['I','II','III','V','VI'], tags:['all'], inspector:['Returns credentials; provides instructions'], driver:['Depart when cleared; comply with any restrictions'], docs:[] },
]

const LEVELS = [
  { key: 'I', label: 'Level I — Full driver + vehicle' },
  { key: 'II', label: 'Level II — Walk‑around' },
  { key: 'III', label: 'Level III — Driver/credentials' },
  { key: 'V', label: 'Level V — Vehicle only' },
  { key: 'VI', label: 'Level VI — Enhanced (radioactive/HRCQ)' },
]

const SCENARIOS = [
  { key: 'general', label: 'General Freight', tags: [] },
  { key: 'hm', label: 'Hazardous Materials (Non‑Bulk)', tags: ['hm'] },
  { key: 'cargo_tank', label: 'Cargo Tank (Tanker)', tags: ['cargo_tank', 'hm'] },
  { key: 'obp', label: 'Other Bulk Packaging (OBP)', tags: ['obp', 'hm'] },
  { key: 'passenger', label: 'Passenger Carrier', tags: ['passenger'] },
  { key: 'rad6', label: 'Radioactive/HRCQ (Level VI context)', tags: ['rad6', 'hm'] },
]

const VEHICLES = [
  { key: 'tt', label: 'Tractor‑Trailer' },
  { key: 'st', label: 'Straight Truck' },
  { key: 'bus', label: 'Bus/Motorcoach' },
  { key: 'combo', label: 'Other Combination' },
]

export default function DotRoadside({ orgName = 'Company' }) {
  const saved = load() || {}
  const [driver, setDriver] = useState(saved.driver || '')
  const [unit, setUnit] = useState(saved.unit || '')
  const [vehicle, setVehicle] = useState(saved.vehicle || 'tt')
  const [level, setLevel] = useState(saved.level || 'I')
  const [scenario, setScenario] = useState(saved.scenario || 'general')
  const [notes, setNotes] = useState(saved.notes || '')
  const [flowState, setFlowState] = useState(saved.state || {})

  useEffect(() => { save({ driver, unit, vehicle, level, scenario, notes, state: flowState }) }, [driver, unit, vehicle, level, scenario, notes, flowState])

  const activeScenarioTags = useMemo(() => SCENARIOS.find((s) => s.key === scenario)?.tags || [], [scenario])
  const steps = useMemo(() => {
    const scenarioTagSet = new Set(activeScenarioTags)
    const vehicleTagSet = new Set([
      ...(vehicle === 'bus' ? ['passenger'] : []),
      ...(vehicle === 'tt' || vehicle === 'combo' ? ['trailered'] : []),
    ])

    function matchesScenarioTags(step) {
      const specific = ['hm', 'cargo_tank', 'obp', 'passenger', 'rad6', 'trailered']
      const stepTags = step.tags || []
      const hasSpecific = stepTags.some((t) => specific.includes(t))
      if (!hasSpecific) return true
      // Allow if any of step's specific tags is active via scenario or vehicle
      return stepTags.some((t) => scenarioTagSet.has(t) || vehicleTagSet.has(t))
    }

    function levelTagRestriction(step) {
      const tags = new Set(step.tags || [])
      if (level === 'III') {
        // Driver/credentials only
        if (tags.has('vehicle') && !tags.has('driver') && !tags.has('doc')) return false
      }
      if (level === 'V') {
        // Vehicle only
        if (tags.has('driver') || tags.has('doc')) return false
      }
      return true
    }

    return LIB
      .filter((s) => s.levels.includes(level))
      .filter((s) => matchesScenarioTags(s))
      .filter((s) => levelTagRestriction(s))
  }, [level, activeScenarioTags, vehicle])

  const stats = useMemo(() => {
    const understood = steps.filter((s) => flowState[s.id]?.status === 'understood').length
    const clarify = steps.filter((s) => flowState[s.id]?.status === 'clarify').length
    const na = steps.filter((s) => flowState[s.id]?.status === 'na').length
    return { total: steps.length, understood, clarify, na }
  }, [steps, flowState])

  function setStatus(id, status) { setFlowState((prev) => ({ ...prev, [id]: { ...(prev[id] || {}), status } })) }
  function setNote(id, note) { setFlowState((prev) => ({ ...prev, [id]: { ...(prev[id] || {}), note } })) }

  function exportJSON() { const data = { orgName, driver, unit, vehicle, level, scenario, notes, state: flowState, when: new Date().toISOString() }; const fname = `inspection_flow_${level}_${scenario}_${unit || 'unit'}_${new Date().toISOString().slice(0, 10)}.json`; downloadJSON(fname, data) }
  function importJSON(ev) { const file = ev.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { try { const d = JSON.parse(reader.result); setDriver(d.driver || ''); setUnit(d.unit || ''); setVehicle(d.vehicle || 'tt'); setLevel(d.level || 'I'); setScenario(d.scenario || 'general'); setNotes(d.notes || ''); setFlowState(d.state || {}) } catch { alert('Could not read file.') } }; reader.readAsText(file) }
  function reset() { localStorage.removeItem(LOCAL_KEY); window.location.reload() }

  return (
    <div className="vehicle-inspections-page">
      <GlobalHeader />
      <section className="section-padding">
        <div className="container">
          <section className="rf-wrap">
            <div className="rf-title">Roadside Inspection — What to Expect</div>
            <div className="rf-sub">From interview to release, tailored to your inspection level and haul type.</div>

            <div className="card">
              <div className="grid-2">
                <div className="ctrl"><label>Driver</label><input value={driver} onChange={(e) => setDriver(e.target.value)} placeholder="Name" /></div>
                <div className="ctrl"><label>Vehicle / Unit #</label><input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="e.g., Tractor 123" /></div>
                <div className="ctrl"><label>Inspection Level</label>
                  <select value={level} onChange={(e) => setLevel(e.target.value)}>
                    {LEVELS.map((l) => <option key={l.key} value={l.key}>{l.label}</option>)}
                  </select>
                </div>
                <div className="ctrl"><label>Vehicle Type</label>
                  <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
                    {VEHICLES.map((v) => <option key={v.key} value={v.key}>{v.label}</option>)}
                  </select>
                </div>
                <div className="ctrl"><label>Haul / Scenario</label>
                  <select value={scenario} onChange={(e) => setScenario(e.target.value)}>
                    {SCENARIOS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                  </select>
                </div>
                <div className="ctrl"><label>Your Notes</label><textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything special about this load/route" /></div>
              </div>
              <div className="btns">
                <button className="btn" onClick={() => window.print()}>Print / Save PDF</button>
                <button className="btn" onClick={exportJSON}>Export JSON</button>
                <label className="btn" style={{ cursor: 'pointer' }}>Import JSON<input type="file" accept="application/json" style={{ display: 'none' }} onChange={importJSON} /></label>
                <button className="btn" onClick={reset}>Reset</button>
              </div>
            </div>

            <div className="card" style={{ marginTop: '.8rem' }}>
              <div className="grid-2">
                <div>
                  <div className="muted">Checklist Size</div>
                  <div style={{ marginTop: '.35rem' }}>
                    <span className="pill ok">Total steps: {stats.total}</span>
                  </div>
                </div>
                <div>
                  <div className="muted">Status</div>
                  <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginTop: '.35rem' }}>
                    <span className="pill ok">Understood: {stats.understood}</span>
                    <span className="pill warn">Need Clarification: {stats.clarify}</span>
                    <span className="pill" style={{ background: 'rgba(255,255,255,.08)', border: '1px solid var(--line)' }}>N/A: {stats.na}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flow">
              {steps.map((s, idx) => {
                const st = flowState[s.id]?.status || ''
                const note = flowState[s.id]?.note || ''
                return (
                  <div key={s.id} className="step">
                    <div className="step-h">
                      <div>
                        <div className="step-idx">Step {idx + 1}</div>
                        <div className="step-t">{s.title}</div>
                      </div>
                      <div className="seg" role="group" aria-label="Status selector">
                        <button type="button" aria-pressed={st === 'understood'} onClick={() => setStatus(s.id, 'understood')}>Understood</button>
                        <button type="button" aria-pressed={st === 'clarify'} onClick={() => setStatus(s.id, 'clarify')}>Need Clarification</button>
                        <button type="button" aria-pressed={st === 'na'} onClick={() => setStatus(s.id, 'na')}>N/A</button>
                      </div>
                    </div>
                    <div className="step-b">
                      {s.inspector?.length > 0 && (
                        <div>
                          <div className="muted">What the inspector does</div>
                          <ul className="clean">{s.inspector.map((t, i) => (<li key={i}>{t}</li>))}</ul>
                        </div>
                      )}
                      {s.driver?.length > 0 && (
                        <div>
                          <div className="muted">What you'll be asked to do</div>
                          <ul className="clean">{s.driver.map((t, i) => (<li key={i}>{t}</li>))}</ul>
                          {s.id === 'english' && (
                            <div style={{marginTop:'.35rem'}}>
                              <Link className="btn rf-english-btn" to="/vehicle-inspections/english-proficiency">Study English</Link>
                            </div>
                          )}
                        </div>
                      )}
                      {s.docs?.length > 0 && (
                        <div>
                          <div className="muted">Documents often requested</div>
                          <ul className="clean">{s.docs.map((t, i) => (<li key={i}>{t}</li>))}</ul>
                        </div>
                      )}
                      {st === 'clarify' && (
                        <div className="ctrl">
                          <label className="muted">Your question/notes for this step</label>
                          <textarea rows={2} value={note} onChange={(e) => setNote(s.id, e.target.value)} placeholder="Type what you want to ask or remember" />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="rf-sub" style={{ marginTop: '.9rem' }}>
              <strong>Note:</strong> This is a driver‑facing guide to typical procedures. The official process is defined by the jurisdiction and CVSA for the selected level; actual sequence may vary.
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
