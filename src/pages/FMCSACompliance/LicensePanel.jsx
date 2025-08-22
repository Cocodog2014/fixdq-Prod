import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { computeLicenseResult } from './HeroButton/License'

function StepSelect({ label, options, value, onChange }) {
  return (
    <div className="fc-field">
      <label className="fc-label">{label}</label>
      <div className="fc-options">
        {options.map((opt) => (
          <button key={opt.value} type="button" className={`fc-option ${value===opt.value?'selected':''}`} onClick={() => onChange(opt.value)} aria-pressed={value===opt.value}>
            <span className="fc-option-label">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function LicensePanel({ state, setState }) {
  const navigate = useNavigate()
  const result = useMemo(() => computeLicenseResult(state), [state])
  const cdlRequired = useMemo(() => !/^No CDL Required/i.test(result.cdlClass), [result.cdlClass])
  const setField = (k) => (v) => setState((s)=>({ ...s, [k]: v }))
  return (
    <div className="license-tool" role="region" aria-label="License Decision Tool">
      <h2 style={{marginTop:0}}>What License Do I Need?</h2>
      <p className="fc-disclaimer">This is a simplified guide. Always confirm with FMCSA and your state DMV.</p>
      <div className="fc-grid fc-grid--inline">
        <div className="fc-panel">
          <StepSelect label="Operating Area" value={state.operatingArea} onChange={setField('operatingArea')} options={[{ label: 'Interstate', value: 'interstate' },{ label: 'Intrastate', value: 'intrastate' }]} />
          <StepSelect label="Type of Vehicle" value={state.vehicleType} onChange={setField('vehicleType')} options={[{ label: 'Commercial Truck', value: 'truck' },{ label: 'Bus', value: 'bus' },{ label: 'Passenger Van', value: 'passenger' },{ label: 'Specialty Vehicle', value: 'specialty' }]} />
          <StepSelect label="Is the Vehicle(s) GVW, GVWR, and GCWR" value={state.gvwr} onChange={setField('gvwr')} options={[{ label: 'Under 10,001 lbs', value: 'under_10000' },{ label: '10,001 – 26,000 lbs', value: '10001_26000' },{ label: 'Over 26,000 lbs', value: 'over_26001' }]} />
          <StepSelect label="Towing / Trailer" value={state.trailer} onChange={setField('trailer')} options={[{ label: 'No trailer or ≤ 10,000 lbs', value: 'trailer_10000_or_less' },{ label: 'Trailer > 10,000 lbs', value: 'trailer_over_10000' }]} />
          <StepSelect label="Cargo Type" value={state.cargoType} onChange={setField('cargoType')} options={[{ label: 'General Freight', value: 'general' },{ label: 'Hazardous Materials', value: 'hazmat' },{ label: 'Passenger Transport', value: 'passenger' }]} />
          <StepSelect label="Passenger Count" value={state.passengerCount} onChange={setField('passengerCount')} options={[{ label: 'Under 16 (including driver)', value: 'under16' },{ label: '16 or more (including driver)', value: '16_plus' }]} />
          <StepSelect label="Bulk Liquids / Tank Vehicle" value={state.tankLiquids} onChange={setField('tankLiquids')} options={[{ label: 'No', value: 'no' },{ label: 'Yes', value: 'yes' }]} />
          <StepSelect label="Placarded Hazardous Materials" value={state.placardedHazmat} onChange={setField('placardedHazmat')} options={[{ label: 'No', value: 'no' },{ label: 'Yes', value: 'yes' }]} />
          <StepSelect label="School Bus" value={state.schoolBus} onChange={setField('schoolBus')} options={[{ label: 'No', value: 'no' },{ label: 'Yes', value: 'yes' }]} />
          <StepSelect label="Farm Exemption (FVD)" value={state.farmExemption} onChange={(val)=>{ if(val==='unknown'){ navigate('/farm-exemption-checker')} else { setField('farmExemption')(val) }}} options={[{ label: 'No', value: 'no' },{ label: 'Yes', value: 'yes' },{ label: 'Unknown', value: 'unknown' }]} />
        </div>
        <div className="fc-panel fc-result">
          <h3>Your Result</h3>
          <div className={`result-callout ${cdlRequired ? 'cdl-required' : ''}`}>
            <div className="result-item">
              <span className="result-label">CDL Class</span>
              <span className="result-value">{result.cdlClass}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Endorsements</span>
              <span className="result-value">{result.endorsements.length ? result.endorsements.join(', ') : 'None'}</span>
            </div>
          </div>
          {!!result.notes.length && (
            <ul className="result-notes">
              {result.notes.map((n,i)=>(<li key={i}>{n}</li>))}
            </ul>
          )}
          <div className="result-links">
            {result.references.map((r)=>(<a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer">{r.label}</a>))}
          </div>
        </div>
      </div>
    </div>
  )
}
