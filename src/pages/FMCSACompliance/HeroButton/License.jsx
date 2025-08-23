import './License.css'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export function computeLicenseResult({ vehicleType, gvwr, operatingArea, cargoType, trailer, passengerCount, tankLiquids, placardedHazmat, farmExemption, schoolBus }) {
  let cdlClass = 'No CDL Required'
  let endorsements = new Set()
  const isPassengerScenario = vehicleType === 'bus' || vehicleType === 'passenger' || passengerCount === '16_plus'
  if (isPassengerScenario) endorsements.add('Passenger (P)')
  if (schoolBus === 'yes') endorsements.add('School Bus (S)')
  const wantsHazmat = placardedHazmat === 'yes' || cargoType === 'hazmat'
  const wantsTank = tankLiquids === 'yes'
  if (wantsTank && wantsHazmat) endorsements.add('Tank + HazMat (X)')
  else if (wantsHazmat) endorsements.add('HazMat (H)')
  else if (wantsTank) endorsements.add('Tank (N)')
  if (gvwr === 'over_26001') {
    cdlClass = trailer === 'trailer_over_10000' ? 'Class A' : 'Class B'
  } else if (gvwr === '10001_26000') {
    if (trailer === 'trailer_over_10000') cdlClass = 'Class A (likely; verify GCWR ≥ 26,001)'
    else if (endorsements.size > 0) cdlClass = 'Class C'
    else cdlClass = 'No CDL Required'
  } else if (gvwr === 'under_10000') {
    if (isPassengerScenario || wantsHazmat || wantsTank) cdlClass = 'Class C (check state-specific thresholds)'
    else cdlClass = 'No CDL Required'
  }
  const notes = []
  if (operatingArea === 'interstate') notes.push('Interstate operations may require USDOT number and Medical Examiner’s Certificate.')
  else if (operatingArea === 'intrastate') notes.push('Intrastate rules vary by state; verify additional state requirements.')
  if (trailer === 'trailer_over_10000' && gvwr !== 'over_26001') notes.push('If GCWR ≥ 26,001 and trailer > 10,000 lbs, Class A applies.')
  if (farmExemption === 'yes' && operatingArea === 'intrastate' && !wantsHazmat && passengerCount !== '16_plus' && schoolBus !== 'yes') notes.push('Farm Vehicle Driver (FVD) exemption may apply within 150 air-miles; CDL may not be required. Confirm with your state DMV.')
  return { cdlClass, endorsements: Array.from(endorsements), notes, references: [
  { label: 'Medical Requirements (Guide)', href: '/medical-requirements' },
  { label: 'License Endorsements', href: 'https://www.fmcsa.dot.gov/sites/fmcsa.dot.gov/files/docs/Commercial_Drivers_License_Endorcements_508CLN.pdf' },
  { label: 'Farm Vehicle Driver Exemptions', href: '/farm-vehicle-driver-exemptions' },
  ] }
}
export default function License({ active, onClick }) {
  return (
    <button type="button" className={`hero-top-btn hero-btn--license ${active ? 'active' : ''}`} aria-pressed={active} onClick={onClick}>
      <span className="hero-top-emoji" aria-hidden="true">🧭</span>
      <span>What License Do I Need?</span>
    </button>
  )
}

function StepSelect({ label, options, value, onChange }) {
  return (
    <div className="fc-field">
      <label className="fc-label">{label}</label>
      <div className="fc-options">
        {options.map(opt => (
          <button key={opt.value} type="button" className={`fc-option ${value===opt.value?'selected':''}`} onClick={() => onChange(opt.value)} aria-pressed={value===opt.value}>
            <span className="fc-option-label">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export function LicensePanel({ state, setState, onClose }) {
  const navigate = useNavigate()
  const result = useMemo(() => computeLicenseResult(state), [state])
  const cdlRequired = useMemo(() => !/^No CDL Required/i.test(result.cdlClass), [result.cdlClass])
  const setField = k => v => setState(s => ({ ...s, [k]: v }))
  return (
    <div className="license-tool" role="region" aria-label="License Decision Tool">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'1rem'}}>
        <h2 style={{marginTop:0, marginBottom:0}}>What License Do I Need?</h2>
        {onClose && (
          <button type="button" onClick={onClose} aria-label="Close license tool" style={{background:'#0369a1',color:'#fff',border:'none',padding:'0.5rem 0.85rem',borderRadius:'999px',fontSize:'0.8rem',cursor:'pointer'}}>
            Back
          </button>
        )}
      </div>
      <p className="fc-disclaimer">This is a simplified guide. Always confirm with FMCSA and your state DMV.</p>
      <div className="fc-grid fc-grid--inline">
        <div className="fc-panel">
          <StepSelect label="Operating Area" value={state.operatingArea} onChange={setField('operatingArea')} options={[{ label:'Interstate', value:'interstate' },{ label:'Intrastate', value:'intrastate' }]} />
          <StepSelect label="Type of Vehicle" value={state.vehicleType} onChange={setField('vehicleType')} options={[{ label:'Commercial Truck', value:'truck' },{ label:'Bus', value:'bus' },{ label:'Passenger Van', value:'passenger' },{ label:'Specialty Vehicle', value:'specialty' }]} />
          <StepSelect label="Is the Vehicle(s) GVW, GVWR, and GCWR" value={state.gvwr} onChange={setField('gvwr')} options={[{ label:'Under 10,001 lbs', value:'under_10000' },{ label:'10,001 – 26,000 lbs', value:'10001_26000' },{ label:'Over 26,000 lbs', value:'over_26001' }]} />
            <StepSelect label="Towing / Trailer" value={state.trailer} onChange={setField('trailer')} options={[{ label:'No trailer or ≤ 10,000 lbs', value:'trailer_10000_or_less' },{ label:'Trailer > 10,000 lbs', value:'trailer_over_10000' }]} />
          <StepSelect label="Cargo Type" value={state.cargoType} onChange={setField('cargoType')} options={[{ label:'General Freight', value:'general' },{ label:'Hazardous Materials', value:'hazmat' },{ label:'Passenger Transport', value:'passenger' }]} />
          <StepSelect label="Passenger Count" value={state.passengerCount} onChange={setField('passengerCount')} options={[{ label:'Under 16 (including driver)', value:'under16' },{ label:'16 or more (including driver)', value:'16_plus' }]} />
          <StepSelect label="Bulk Liquids / Tank Vehicle" value={state.tankLiquids} onChange={setField('tankLiquids')} options={[{ label:'No', value:'no' },{ label:'Yes', value:'yes' }]} />
          <StepSelect label="Placarded Hazardous Materials" value={state.placardedHazmat} onChange={setField('placardedHazmat')} options={[{ label:'No', value:'no' },{ label:'Yes', value:'yes' }]} />
          <StepSelect label="School Bus" value={state.schoolBus} onChange={setField('schoolBus')} options={[{ label:'No', value:'no' },{ label:'Yes', value:'yes' }]} />
          <StepSelect label="Farm Exemption (FVD)" value={state.farmExemption} onChange={val => { if(val==='unknown'){ navigate('/farm-exemption-checker'); } else { setField('farmExemption')(val) } }} options={[{ label:'No', value:'no' },{ label:'Yes', value:'yes' },{ label:'Unknown', value:'unknown' }]} />
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
            {result.references.map(r => {
              const isInternal = r.href.startsWith('/')
              return (
                <a
                  key={r.href}
                  href={r.href}
                  {...(isInternal ? { onClick: e => { e.preventDefault(); navigate(r.href) } } : { target: '_blank', rel: 'noopener noreferrer' })}
                >{r.label}</a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
