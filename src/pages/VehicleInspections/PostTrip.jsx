import React, { useEffect, useMemo, useState } from 'react'
import GlobalHeader from '../../components/GlobalHeader'

// Metadata & helpers
const LOCAL_KEY = 'posttrip_dvir_v1'
const PARTS_LIST = [
  { id: 'service_brakes', text: 'Service brakes (incl. trailer brake connections)' },
  { id: 'parking_brake', text: 'Parking (hand) brake' },
  { id: 'steering', text: 'Steering mechanism' },
  { id: 'lighting', text: 'Lighting devices & reflectors' },
  { id: 'tires', text: 'Tires' },
  { id: 'horn', text: 'Horn' },
  { id: 'wipers', text: 'Windshield wipers' },
  { id: 'mirrors', text: 'Rear‑vision mirrors' },
  { id: 'coupling', text: 'Coupling devices' },
  { id: 'wheels_rims', text: 'Wheels & rims' },
  { id: 'emergency_equipment', text: 'Emergency equipment' },
]

function load() { try { const raw = localStorage.getItem(LOCAL_KEY); return raw ? JSON.parse(raw) : null } catch { return null } }
function save(s) { try { localStorage.setItem(LOCAL_KEY, JSON.stringify(s)) } catch { } }
function downloadJSON(filename, data) { const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url) }

export default function PostTrip() {
  const [driver, setDriver] = useState(load()?.driver || '')
  const [unit, setUnit] = useState(load()?.unit || '')
  const [trailer, setTrailer] = useState(load()?.trailer || '')
  const [odometer, setOdometer] = useState(load()?.odometer || '')
  const [location, setLocation] = useState(load()?.location || '')
  const [dt, setDt] = useState(load()?.dt || new Date().toISOString().slice(0, 16))
  const [signature, setSignature] = useState(load()?.signature || '')

  const [answers, setAnswers] = useState(load()?.answers || {})
  const [carrierCert, setCarrierCert] = useState(load()?.carrierCert || { action: '', mechanic: '', date: '', remarks: '' })
  const [open, setOpen] = useState(load()?.open ?? true)

  useEffect(() => { save({ driver, unit, trailer, odometer, location, dt, signature, answers, carrierCert, open }) }, [driver, unit, trailer, odometer, location, dt, signature, answers, carrierCert, open])

  function setStatus(key, status) { setAnswers((prev) => ({ ...prev, [key]: { ...(prev[key] || {}), status } })) }
  function setNote(key, note) { setAnswers((prev) => ({ ...prev, [key]: { ...(prev[key] || {}), note } })) }

  const items = useMemo(() => PARTS_LIST.map((p) => ({ ...p, key: `dvir.${p.id}` })), [])
  const defects = items.filter((i) => answers[i.key]?.status === 'defect')
  const okCount = items.filter((i) => answers[i.key]?.status === 'ok').length
  const naCount = items.filter((i) => answers[i.key]?.status === 'na').length
  const mustPrepareDVIR = defects.length > 0

  function exportJSON() { const kind = mustPrepareDVIR ? 'dvir' : 'posttrip_log'; const data = { kind, driver, unit, trailer, odometer, location, dt, signature, answers, carrierCert }; const fname = `${kind}_${unit || 'unit'}_${new Date().toISOString().slice(0, 10)}.json`; downloadJSON(fname, data) }

  return (
    <div className="vehicle-inspections-page">
      <GlobalHeader />
      <section className="section-padding">
        <div className="container">
          <section className="dv-wrap">
            <div className="dv-title">Post‑Trip / DVIR</div>
            <div className="dv-sub">End‑of‑day inspection report. DVIR required only if a defect/deficiency is found or reported.</div>

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
                <button className="btn" onClick={() => window.print()}>Print / Save PDF</button>
                <button className="btn" onClick={exportJSON}>Export JSON</button>
              </div>
            </div>

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
                  <div className="muted">DVIR Requirement</div>
                  <div style={{ marginTop: '.35rem' }}>
                    {mustPrepareDVIR ? (
                      <span className="badge bad">DVIR REQUIRED — defects found/reported</span>
                    ) : (
                      <span className="badge ok">No defects — DVIR not required by FMCSA</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion">
              <div className="acc-head" onClick={() => setOpen((v) => !v)}>
                <div className="acc-title">Report items (49 CFR §396.11 list)</div>
                <div className="muted">{open ? 'Hide' : 'Show'}</div>
              </div>
              {open && (
                <div className="acc-body">
                  {items.map((it) => {
                    const key = it.key; const state = answers[key]?.status || ''; const note = answers[key]?.note || ''
                    return (
                      <div key={key} className="item">
                        <div>
                          <div>{it.text}</div>
                          {state === 'defect' && (
                            <div className="ctrl" style={{ marginTop: '.4rem' }}>
                              <label className="muted">Describe defect / deficiency</label>
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
                  <div className="item">
                    <div className="ctrl" style={{ width: '100%' }}>
                      <label>Other defects/notes</label>
                      <textarea rows={2} value={answers.other?.note || ''} onChange={(e) => setAnswers((prev) => ({ ...prev, other: { ...(prev.other || {}), note: e.target.value } }))} placeholder="Anything not covered above..." />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="card" style={{ marginTop: '.8rem' }}>
              <div className="grid-2">
                <div className="ctrl">
                  <label>Driver signature (type your name)</label>
                  <input value={signature} onChange={(e) => setSignature(e.target.value)} placeholder="Driver signature" />
                </div>
                <div className="ctrl">
                  <label>Reminder</label>
                  <div className="muted">If multiple vehicles were operated today, prepare a report for each vehicle with defects. Carrier must retain DVIRs & repair certs for at least 3 months.</div>
                </div>
              </div>
            </div>

            <div className="card" style={{ marginTop: '.8rem' }}>
              <h3 style={{ marginTop: 0 }}>Carrier / Maintenance Certification</h3>
              <div className="grid-2">
                <div className="ctrl">
                  <label>Action</label>
                  <select value={carrierCert.action} onChange={(e) => setCarrierCert((v) => ({ ...v, action: e.target.value }))}>
                    <option value="">— select —</option>
                    <option value="corrected">Defects corrected</option>
                    <option value="not_necessary">Correction not necessary for safe operation</option>
                  </select>
                </div>
                <div className="ctrl"><label>Mechanic / Inspector</label><input value={carrierCert.mechanic} onChange={(e) => setCarrierCert((v) => ({ ...v, mechanic: e.target.value }))} placeholder="Name" /></div>
                <div className="ctrl"><label>Date</label><input type="date" value={carrierCert.date} onChange={(e) => setCarrierCert((v) => ({ ...v, date: e.target.value }))} /></div>
                <div className="ctrl"><label>Remarks</label><textarea rows={2} value={carrierCert.remarks} onChange={(e) => setCarrierCert((v) => ({ ...v, remarks: e.target.value }))} placeholder="Notes about repairs or decision" /></div>
              </div>
              <div className="muted" style={{ marginTop: '.4rem' }}>Carrier certification must be completed before the vehicle is dispatched again when defects are noted.</div>
            </div>

            <div className="dv-sub" style={{ marginTop: '.9rem' }}>
              <strong>Note:</strong> This tool supports compliance with 49 CFR §396.11. Always follow company policy and current FMCSA/state rules.
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
