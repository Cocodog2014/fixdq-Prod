import React, { useEffect, useMemo, useState } from 'react'
import GlobalHeader from '../../components/GlobalHeader'

const LOCAL_KEY = 'maint_repair_log_v1'

function load() { try { const raw = localStorage.getItem(LOCAL_KEY); return raw ? JSON.parse(raw) : null } catch { return null } }
function save(s) { try { localStorage.setItem(LOCAL_KEY, JSON.stringify(s)) } catch { } }
function downloadJSON(filename, data) { const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url) }

function safeId() {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  } catch {}
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

const TYPES = ['Inspection','Preventive Maintenance','Repair','Recall/TSB','Parts Replacement']

export default function MaintenanceRepair() {
  const saved = load() || {}
  const [unit, setUnit] = useState(saved.unit || '')
  const [vin, setVin] = useState(saved.vin || '')
  const [records, setRecords] = useState(saved.records || [])
  const [filter, setFilter] = useState(saved.filter || { type: 'All', query: '' })

  useEffect(() => { save({ unit, vin, records, filter }) }, [unit, vin, records, filter])

  function addRecord() {
    setRecords((prev) => [{ id: safeId(), date: new Date().toISOString().slice(0,10), type: 'Inspection', odometer: '', vendor: '', work: '', parts: '', cost: '', docs: '' }, ...prev])
    // Ensure the newly added record is visible
    setFilter({ type: 'All', query: '' })
  }
  function updateRecord(id, patch) { setRecords((prev) => prev.map((r) => r.id === id ? { ...r, ...patch } : r)) }
  function deleteRecord(id) { if (confirm('Delete this record?')) setRecords((prev) => prev.filter((r) => r.id !== id)) }
  function exportJSON() { const fname = `maint_${unit || 'unit'}_${new Date().toISOString().slice(0,10)}.json`; downloadJSON(fname, { unit, vin, records }) }
  function clearAll() { if (confirm('Clear all maintenance data?')) { localStorage.removeItem(LOCAL_KEY); window.location.reload() } }
  function exportCSV() {
    const headers = ['date','type','odometer','vendor','work','parts','cost','docs']
    const escape = (v='') => '"' + String(v).replace(/"/g,'""') + '"'
    const rows = [headers.join(',')].concat(records.map(r => [r.date,r.type,r.odometer,r.vendor,r.work,r.parts,r.cost,r.docs].map(escape).join(',')))
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `maint_${unit || 'unit'}_${new Date().toISOString().slice(0,10)}.csv`; a.click(); URL.revokeObjectURL(url)
  }

  const shown = useMemo(() => {
    return records.filter((r) => (filter.type === 'All' || r.type === filter.type) &&
      (filter.query.trim() === '' || (r.work + ' ' + r.vendor + ' ' + r.parts).toLowerCase().includes(filter.query.toLowerCase())))
  }, [records, filter])
  const totalCost = useMemo(() => {
    return shown.reduce((sum, r) => {
      const n = parseFloat(String(r.cost).replace(/[^0-9.\-]/g,''))
      return sum + (isNaN(n) ? 0 : n)
    }, 0)
  }, [shown])

  return (
    <div className="vehicle-inspections-page">
      <GlobalHeader />
      <section className="section-padding">
        <div className="container">
          <section className="mr-wrap">
            <div className="mr-title">Maintenance & Repair</div>
            <div className="mr-sub">Track inspections, PMs, repairs, and parts for each unit. Export for audits or shop coordination.</div>

            <div className="card mr-screen">
              <div className="grid-2">
                <div className="ctrl"><label>Vehicle / Unit #</label><input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="e.g., Tractor 123" /></div>
                <div className="ctrl"><label>VIN</label><input value={vin} onChange={(e) => setVin(e.target.value)} placeholder="Last 6 or full VIN" /></div>
                <div className="ctrl"><label>Filter Type</label>
                  <select value={filter.type} onChange={(e) => setFilter((f) => ({ ...f, type: e.target.value }))}>
                    <option>All</option>
                    {TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="ctrl"><label>Search</label><input value={filter.query} onChange={(e) => setFilter((f) => ({ ...f, query: e.target.value }))} placeholder="work, vendor, parts" /></div>
              </div>
              <div className="btns">
                <button className="btn" onClick={() => window.print()}>Print / Save PDF</button>
                <button className="btn" onClick={addRecord}>Add Record</button>
                <button className="btn" onClick={exportJSON}>Export JSON</button>
                <button className="btn" onClick={exportCSV}>Export CSV</button>
                <button className="btn" onClick={clearAll}>Reset</button>
              </div>
            </div>

            <div className="card mr-screen" style={{ marginTop: '.8rem' }}>
              <div className="summary">
                <div>
                  <div className="muted">Records Shown</div>
                  <div style={{ marginTop: '.35rem' }}>
                    <span className="badge ok">{shown.length}</span>
                  </div>
                </div>
                <div>
                  <div className="muted">Total Cost (shown)</div>
                  <div style={{ marginTop: '.35rem' }}>
                    <span className="badge warn">${totalCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mr-list mr-screen">
              {shown.length === 0 && (
                <div className="empty">No records match. Add a record or adjust filters.</div>
              )}
              {shown.map((r) => (
                <div key={r.id} className="mr-item card">
                  <div className="mr-head">
                    <div className="mr-left">
                      <div className="mr-date">
                        <input type="date" value={r.date} onChange={(e) => updateRecord(r.id, { date: e.target.value })} />
                      </div>
                      <div className="mr-type">
                        <select value={r.type} onChange={(e) => updateRecord(r.id, { type: e.target.value })}>
                          {TYPES.map((t) => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="mr-odo"><input inputMode="numeric" placeholder="Odometer" value={r.odometer} onChange={(e) => updateRecord(r.id, { odometer: e.target.value })} /></div>
                    </div>
                    <div className="mr-right">
                      <button className="btn" onClick={() => deleteRecord(r.id)}>Delete</button>
                    </div>
                  </div>
                  <div className="mr-body grid-2">
                    <div className="ctrl"><label>Vendor / Shop</label><input value={r.vendor} onChange={(e) => updateRecord(r.id, { vendor: e.target.value })} placeholder="Who did the work" /></div>
                    <div className="ctrl"><label>Cost</label><input inputMode="decimal" value={r.cost} onChange={(e) => updateRecord(r.id, { cost: e.target.value })} placeholder="$0.00" /></div>
                    <div className="ctrl"><label>Work Performed</label><textarea rows={2} value={r.work} onChange={(e) => updateRecord(r.id, { work: e.target.value })} placeholder="Describe PM/repair/inspection" /></div>
                    <div className="ctrl"><label>Parts Used</label><textarea rows={2} value={r.parts} onChange={(e) => updateRecord(r.id, { parts: e.target.value })} placeholder="Part numbers, qty" /></div>
                    <div className="ctrl"><label>Documents / Links</label><input value={r.docs} onChange={(e) => updateRecord(r.id, { docs: e.target.value })} placeholder="URL or file ref" /></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Print-only table for readable PDFs */}
            <div className="mr-print">
              <h2>Maintenance & Repair — {unit || 'Unit'}</h2>
              {vin && (<div style={{ marginBottom: '.5rem' }}>VIN: {vin}</div>)}
              <div style={{ marginBottom: '.5rem' }}>Printed: {new Date().toLocaleString()}</div>
              <table className="mr-print-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Odometer</th>
                    <th>Vendor</th>
                    <th>Work Performed</th>
                    <th>Parts</th>
                    <th>Cost</th>
                    <th>Docs/Links</th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((r) => (
                    <tr key={r.id}>
                      <td>{r.date}</td>
                      <td>{r.type}</td>
                      <td>{r.odometer}</td>
                      <td>{r.vendor}</td>
                      <td>{r.work}</td>
                      <td>{r.parts}</td>
                      <td>{r.cost}</td>
                      <td>{r.docs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: '.5rem' }}><strong>Total (shown):</strong> ${totalCost.toFixed(2)}</div>
            </div>

            <div className="mr-sub" style={{ marginTop: '.9rem' }}>
              <strong>Note:</strong> Keep maintenance and DVIR repair certifications for at least 3 months (49 CFR §396.3 & §396.11).
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
