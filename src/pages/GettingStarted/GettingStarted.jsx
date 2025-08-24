import React, { useMemo, useState } from 'react'
import GlobalHeader from '../../components/GlobalHeader'

// Getting Started page integrating the CMVFlowchart (Driver / Carrier / Broker)

function CMVFlowchart({ cdlLink = '#' }) {
  const tree = useMemo(
    () => ({ id: 'root', title: 'Start Here', choices: [
      { id: 'driver', label: 'Driver' },
      { id: 'carrier', label: 'Carrier / Company' },
      { id: 'broker', label: 'Broker' }
    ] }),
    []
  )

  const stepsByNode = {
    driver: {
      title: 'Path: Driver',
      steps: [
        { text: 'Download your state CDL manual.', actions: [{ type: 'cdl-manual' }] },
        {
          text: 'Study and schedule the knowledge test.',
          hint: 'You’ll take general knowledge + any endorsement tests you need.',
          actions: [ { label: 'Do I Need a Commercial License?', href: '/fmcsa-compliance#flowchart', defKey: 'cdl' } ]
        },
        {
          text: 'Complete ELDT (Entry‑Level Driver Training) if required.',
          hint: 'ELDT is federally required training for new CDL A/B and certain upgrades.',
          actions: [ { type: 'eldt' } ]
        },
        { text: 'Pass the skills/road test and earn your CDL.' },
        {
          text: 'Get a DOT physical exam and keep your Medical Card current.',
          actions: [ { type: 'dot-physical' } ]
        },
        { text: 'Get hired or lease onto a motor carrier and learn HOS/ELD basics.' }
      ],
      tags: ['CDL', 'ELDT', 'DOT Physical', 'HOS/ELD']
    },
    carrier: {
      title: 'Path: Carrier / Company',
      steps: [
        { text: 'Form your business (LLC/Corp/Sole Prop) and get an EIN.' },
        { text: 'Apply for USDOT Number (all carriers) and MC Number if for‑hire (URS).' },
        { text: 'Obtain insurance (BMC‑91/91X filed) and designate a BOC‑3 agent.' },
        { text: 'Set up compliance: DQ Files, HOS/ELD, drug & alcohol testing.' },
        { text: 'Create vehicle maintenance/inspection program and prepare for audits.' },
        { text: 'Register for IRP/IFTA for apportioned plates and fuel tax (if interstate).' }
      ],
      tags: ['USDOT', 'MC #', 'BOC‑3', 'IRP/IFTA', 'ELD'],
      extraActions: [
  { label: 'Do I Need a Commercial License?', href: '/fmcsa-compliance#flowchart', defKey: 'cdl' },
  { label: 'Do I Need a Medical Certificate?', href: '/medical-requirements', defKey: 'medical' }
      ]
    },
    broker: {
      title: 'Path: Broker',
      steps: [
        { text: 'Form your business and obtain an EIN.' },
        { text: 'Apply for Broker Authority (MC Number) via URS.' },
        { text: 'Secure $75,000 surety bond or trust (BMC‑84 or BMC‑85).' },
        { text: 'File BOC‑3 process agent.' },
        { text: 'Set up broker compliance: records, carrier vetting, contracts/payments.' }
      ],
      tags: ['MC #', '$75k Bond/Trust', 'BOC‑3'],
      extraActions: [
  { label: 'Do I Need a Medical Certificate?', href: '/medical-requirements', defKey: 'medical' }
      ]
    }
  }

  const [stack, setStack] = useState([tree.id])
  const [definition, setDefinition] = useState('')
  const [stateCode, setStateCode] = useState('AZ')

  const currentId = stack[stack.length - 1]
  const isRoot = currentId === 'root'
  const node = isRoot ? tree : stepsByNode[currentId]

  function choose(id) { setStack(s => [...s, id]); setDefinition('') }
  function goBack() { if (stack.length > 1) setStack(s => s.slice(0, -1)); setDefinition('') }

  function openAndDefine(href, defKey) {
    window.open(href, '_blank', 'noopener,noreferrer')
    if (defKey) setDefinition(definitions[defKey] || '')
  }
  function openCdlManualSearch() {
    const st = states.find(s => s.code === stateCode)
    const q = encodeURIComponent(`${st?.name || stateCode} CDL manual pdf site:.gov`)
    openAndDefine(`https://www.google.com/search?q=${q}`, 'cdlManual')
  }
  function renderStep(step, idx) {
    return (
      <li key={idx} className="gs-step">
        <div className="gs-step-top">
          <div className="gs-step-num">{idx + 1}</div>
          <div>
            <div className="gs-step-text">{step.text}</div>
            {step.hint && <div className="gs-hint">{step.hint}</div>}
          </div>
        </div>
        {Array.isArray(step.actions) && step.actions.length > 0 && (
          <div className="gs-action-row">
            {step.actions.map((a, i) => {
              if (a.type === 'cdl-manual') {
                return (
                  <div key={i} className="gs-inline-helper">
                    <label className="gs-label">Your state:</label>
                    <select value={stateCode} onChange={e => setStateCode(e.target.value)} className="gs-select">
                      {states.map(s => (
                        <option key={s.code} value={s.code}>{s.code} — {s.name}</option>
                      ))}
                    </select>
                    <button className="gs-link-btn" onClick={openCdlManualSearch}>Open CDL Manual ↗</button>
                  </div>
                )
              }
              if (a.type === 'eldt') {
                return (
                  <div key={i} className="gs-inline-helper">
                    <button className="gs-link-btn" onClick={() => openAndDefine(fmcsaLinks.eldtRegistry, 'eldt')}>Find ELDT Provider ↗</button>
                    <details className="gs-details"><summary>What is ELDT?</summary>
                      <div className="gs-detail-text">{definitions.eldt}</div>
                    </details>
                  </div>
                )
              }
              if (a.type === 'dot-physical') {
                return (
                  <div key={i} className="gs-inline-helper">
                    <button className="gs-link-btn" onClick={() => openAndDefine(fmcsaLinks.nrcmeSearch, 'medical')}>Find DOT Medical Examiner ↗</button>
                    <details className="gs-details"><summary>What is a DOT physical?</summary>
                      <div className="gs-detail-text">{definitions.medical}</div>
                    </details>
                  </div>
                )
              }
              return (
                <button key={i} className="gs-link-btn" onClick={() => openAndDefine(a.href, a.defKey)}>{a.label} ↗</button>
              )
            })}
          </div>
        )}
      </li>
    )
  }

  return (
    <section className={`gs-flow path-${currentId}`}>
      <div className="gs-left">
        <h2 className="gs-h2">Where are you starting?</h2>
        <div className="gs-choice-col">
          {tree.choices.map(c => (
            <button
              key={c.id}
              className={`gs-choice-btn ${currentId === c.id ? 'active' : ''}`}
              onClick={() => choose(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <div className="gs-right">
        <div className="gs-head">
          <button onClick={goBack} disabled={isRoot} className={`gs-back ${isRoot ? 'disabled' : ''}`}>Back</button>
          <div className="gs-crumbs">{breadcrumb(stack)}</div>
        </div>
        <article className="gs-card">
          <h3 className="gs-h3">{node.title || 'Start Here'}</h3>
          {isRoot ? (
            <>
              <p>Select a path on the left to see the exact steps you need.</p>
              <ul className="gs-bullets">
                <li><b>Driver</b> – get licensed and job‑ready.</li>
                <li><b>Carrier/Company</b> – set up your trucking/bus company.</li>
                <li><b>Broker</b> – arrange freight without owning trucks.</li>
              </ul>
              <p className="gs-note">This is a simplified guide. Always confirm with FMCSA and your state DMV.</p>
            </>
          ) : (
            <>
              <div className="gs-tag-row">
                {(node.tags || []).map(t => (<span key={t} className="gs-tag">{t}</span>))}
              </div>
              <ol className="gs-steps">
                {(node.steps || []).map(renderStep)}
              </ol>
              {Array.isArray(node.extraActions) && node.extraActions.length > 0 && (
                <div className="gs-cta-row">
                  {node.extraActions.map(c => (
                    <button key={c.label} className="gs-link-btn" onClick={() => openAndDefine(c.href, c.defKey)} title={c.href}>{c.label} ↗</button>
                  ))}
                </div>
              )}
            </>
          )}
        </article>
        <div className="gs-links">
          <a href="/fmcsa-compliance#flowchart" onClick={e => { e.preventDefault(); window.location.href='/fmcsa-compliance#flowchart'; }}>{'Do I Need a Commercial License?'}</a>
          <a href="/medical-requirements" onClick={e => { e.preventDefault(); window.location.href='/medical-requirements'; }}>Do I Need a Medical Certificate?</a>
          <a href="/fmcsa-compliance#flowchart" onClick={e => { e.preventDefault(); window.location.href='/fmcsa-compliance#flowchart'; }}>Do I Need HazMat or Tanker (H / N / X) Endorsements?</a>
          <a href="/fmcsa-compliance#flowchart" onClick={e => { e.preventDefault(); window.location.href='/fmcsa-compliance#flowchart'; }}>Do I Fall Under the Farm Vehicle Driver Exemptions?</a>
          <div className="gs-def-box" aria-live="polite">{definition}</div>
        </div>
      </div>
    </section>
  )
}

const definitions = {
  cdl: 'A CDL is required if you operate a vehicle ≥ 26,001 lbs GCWR/GVWR, carry 16+ passengers (including driver), or transport placarded hazardous materials. Some uses (RVs, certain farm/emergency vehicles) may be exempt.',
  cdlManual: 'Choose your state and open the official CDL manual (or the state’s latest PDF).',
  medical: 'Most CDL drivers must pass a DOT physical with a certified medical examiner and carry a valid Medical Examiner’s Certificate.',
  eldt: 'ELDT (Entry‑Level Driver Training) is federally required instruction (theory + behind‑the‑wheel) for new CDL A/B applicants and certain upgrades/endorsements, tracked in FMCSA’s Training Provider Registry.',
  endorsements: 'Endorsements add privileges to your CDL—Tank (N) for bulk liquids; HazMat (H) for placarded hazardous materials; X combines Tank + HazMat (after TSA background + knowledge tests).',
  farm: 'Some farm vehicle drivers are exempt from CDL if operating within limited radius and conditions; rules vary—verify details before relying on an exemption.'
}

const fmcsaLinks = {
  cdl: 'https://www.fmcsa.dot.gov/registration/commercial-drivers-license',
  medical: 'https://www.fmcsa.dot.gov/medical/driver-medical-requirements/medical-requirements',
  endorsements: 'https://www.fmcsa.dot.gov/regulations/hazmat/hazardous-materials-endorsement',
  farm: 'https://www.fmcsa.dot.gov/regulations/title49/section/390.39',
  eldtRegistry: 'https://tpr.fmcsa.dot.gov/',
  nrcmeSearch: 'https://nationalregistry.fmcsa.dot.gov/search'
}

const states = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' }, { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' }, { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' }
]

// styles moved to external CSS (GettingStarted.css)

function breadcrumb(stack) {
  const names = { root: 'Home', driver: 'Driver', carrier: 'Carrier', broker: 'Broker' }
  return stack.map((id, i) => (i === stack.length - 1 ? names[id] : names[id] + ' › ')).join('')
}

export default function GettingStarted() {
  return (
    <div className="getting-started-page gradient-page">
      <GlobalHeader />
      <div className="container gs-container">
        <h1>Getting Started: Choose Your Path</h1>
        <p className="gs-intro">New to commercial driving or the trucking industry? Pick your starting point (Driver, Carrier/Company, or Broker) and follow the actionable steps with quick reference tools.</p>
        <CMVFlowchart cdlLink={fmcsaLinks.cdl} />
      </div>
    </div>
  )
}
