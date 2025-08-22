import './License.css'

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
    { label: 'FMCSA: Do I Need a CDL?', href: 'https://www.fmcsa.dot.gov/registration/commercial-drivers-license' },
    { label: 'FMCSA: Medical Requirements', href: 'https://www.fmcsa.dot.gov/medical/driver-medical-requirements/medical-requirements' },
    { label: 'FMCSA: Tank Vehicle (N) & HazMat (H/X)', href: 'https://www.fmcsa.dot.gov/registration/commercial-drivers-license/endorsements' },
    { label: 'FMCSA: Farm Vehicle Driver Exemptions', href: 'https://www.fmcsa.dot.gov/registration/commercial-drivers-license/farm-vehicle-driver-exemptions' },
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
