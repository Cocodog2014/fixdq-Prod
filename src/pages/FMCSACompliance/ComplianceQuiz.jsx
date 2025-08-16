import React, { useEffect, useMemo, useState } from 'react'

// BASIC tags
const BASIC = {
  HOS: 'HOS',
  VM: 'Vehicle Maintenance',
  DA: 'Controlled Substances/Alcohol',
  DF: 'Driver Fitness',
  UD: 'Unsafe Driving',
  CI: 'Crash Indicator',
  HZ: 'Hazmat',
}

// Seed question bank (small starter; can be expanded to ~80)
// Contract: { id, section, type, text, choices[], correct[], weight, basicTag[] }
const BANK = [
  // Credentials & Registration
  {
    id: 'cred-1', section: 'Credentials & Registration', type: 'tf',
    text: 'T/F: Your MCS-150 must be reviewed and updated on a scheduled basis even if nothing changed.',
    choices: ['True', 'False'], correct: [0], weight: 1, basicTag: [BASIC.UD]
  },
  {
    id: 'cred-2', section: 'Credentials & Registration', type: 'single',
    text: 'Which filing proves you have a process agent in all states?',
    choices: ['MCS-90', 'BOC-3', 'UCR', 'IFTA'], correct: [1], weight: 1, basicTag: [BASIC.UD]
  },
  {
    id: 'cred-3', section: 'Credentials & Registration', type: 'single',
    text: 'Which combination best demonstrates interstate authority for for-hire carriers?',
    choices: ['USDOT only', 'MC + BOC-3 + insurance filing', 'IFTA only', 'IRP only'],
    correct: [1], weight: 1, basicTag: [BASIC.UD]
  },
  // Driver Qualification
  {
    id: 'dq-1', section: 'Driver Qualification', type: 'multi',
    text: 'Which items must be in every DQF? (Select all)',
    choices: ['Prior employer inquiries', 'Current MVR', 'Medical certificate', 'Road test or equivalent', 'Annual review'],
    correct: [0,1,2,3,4], weight: 2, basicTag: [BASIC.DF]
  },
  {
    id: 'dq-2', section: 'Driver Qualification', type: 'single',
    text: 'You hire a CDL driver. What must be done with the FMCSA Clearinghouse before allowing safety-sensitive work?',
    choices: ['Annual limited query', 'Pre-employment full query', 'Post-accident log', 'Random test'],
    correct: [1], weight: 2, basicTag: [BASIC.DF, BASIC.DA]
  },
  { id: 'dq-3', section: 'Driver Qualification', type: 'tf', text: 'T/F: You can wait 60 days after hire to obtain the driver’s prior employer responses.', choices: ['True','False'], correct: [1], weight: 1, basicTag: [BASIC.DF] },
  // Drug & Alcohol
  {
    id: 'da-1', section: 'Drug & Alcohol', type: 'multi',
    text: 'Select all that trigger post-accident testing requirements under FMCSA (company policy must mirror CFR):',
    choices: ['Tow-away', 'Citation issued and injury treated away from scene', 'Any airbag deployment', 'Fatality'],
    correct: [0,1,3], weight: 2, basicTag: [BASIC.DA, BASIC.CI]
  },
  {
    id: 'da-2', section: 'Drug & Alcohol', type: 'multi',
    text: 'What belongs in a compliant random testing program? (Select all)',
    choices: ['Written policy', 'Random selection method', 'Documented notifications', 'Follow-up/SAP tracking when applicable'],
    correct: [0,1,2,3], weight: 2, basicTag: [BASIC.DA]
  },
  { id: 'da-3', section: 'Drug & Alcohol', type: 'tf', text: 'T/F: Supervisors who make reasonable-suspicion decisions must receive required training.', choices: ['True','False'], correct: [0], weight: 1, basicTag: [BASIC.DA] },
  // HOS & ELD
  {
    id: 'hos-1', section: 'HOS & ELD', type: 'single',
    text: 'A driver loses ELD connectivity for part of a day. What’s the correct response?',
    choices: ['Keep driving, ignore gaps', 'Manual paper RODS per procedure until fixed, annotate, repair timeline', 'Wait for back-office to edit'],
    correct: [1], weight: 3, basicTag: [BASIC.HOS]
  },
  {
    id: 'hos-2', section: 'HOS & ELD', type: 'single',
    text: 'Short-haul exception requires (pick best set):',
    choices: ['Timecards + duty radius + max duty hours + return to reporting location', 'ELD off + no records'],
    correct: [0], weight: 3, basicTag: [BASIC.HOS]
  },
  { id: 'hos-3', section: 'HOS & ELD', type: 'tf', text: 'T/F: All edits to ELD records require annotations and driver certification.', choices: ['True','False'], correct: [0], weight: 2, basicTag: [BASIC.HOS] },
  // Vehicle Maintenance
  {
    id: 'vm-1', section: 'Vehicle Maintenance', type: 'multi',
    text: 'Which are required elements of a systematic maintenance program? (Select all)',
    choices: ['Unit files with inspection/repair records', 'Annual inspection proofs', 'DVIR handling', 'OOS repair sign-off'],
    correct: [0,1,2,3], weight: 3, basicTag: [BASIC.VM]
  },
  { id: 'vm-2', section: 'Vehicle Maintenance', type: 'tf', text: 'T/F: If a DVIR has no defects noted (and you’re on the “no-defect DVIR” allowance), you still must keep it per your retention policy.', choices: ['True','False'], correct: [0], weight: 2, basicTag: [BASIC.VM] },
  // Accidents
  {
    id: 'acc-1', section: 'Accidents & Incident Management', type: 'multi',
    text: 'What must be in your accident register? (Select all)',
    choices: ['Date', 'City/State', 'Driver name', 'Injuries/Fatalities', 'Hazardous material spill', 'Preventability decision'],
    correct: [0,1,2,3,4], weight: 2, basicTag: [BASIC.CI]
  },
  { id: 'acc-2', section: 'Accidents & Incident Management', type: 'text', text: 'Scenario: Tow-away crash with a citation to your driver. What D&A steps are required?', choices: [], correct: [], weight: 1, basicTag: [BASIC.CI, BASIC.DA] },
  // Hazmat (optional)
  {
    id: 'hz-1', section: 'Hazardous Materials', type: 'single',
    text: 'Who needs in-depth security plan training?',
    choices: ['Any shipper', 'Only carriers with placardable quantities per regs', 'Nobody'],
    correct: [1], weight: 2, basicTag: [BASIC.HZ]
  },
  {
    id: 'hz-2', section: 'Hazardous Materials', type: 'multi',
    text: 'Pick compliant shipping paper elements (Select all)',
    choices: ['Proper shipping name', 'UN/NA number', 'Hazard class', 'Packing group (if applicable)', 'Emergency phone'],
    correct: [0,1,2,3,4], weight: 2, basicTag: [BASIC.HZ]
  },
  // Safety Management
  { id: 'sm-1', section: 'Safety Management & Training', type: 'multi', text: 'Which items show an effective safety management control system? (Select all)', choices: ['Written policy', 'Orientation + recurrent training', 'Documented coaching/corrective action', 'Trend reviews'], correct: [0,1,2,3], weight: 1, basicTag: [BASIC.UD] },
  // CSA/SMS
  { id: 'sms-1', section: 'CSA/SMS Understanding', type: 'single', text: 'A spike in Vehicle Maintenance BASIC most likely points to issues with:', choices: ['Speeding','Lighting/brakes/DVIR','Hours edits','Prior employer checks'], correct: [1], weight: 2, basicTag: [BASIC.VM] },
  { id: 'sms-2', section: 'CSA/SMS Understanding', type: 'single', text: 'Best first steps after receiving multiple “unassigned driving time” ELD alerts?', choices: ['Ignore', 'Assign/annotate, coach drivers, tighten yard moves policy'], correct: [1], weight: 2, basicTag: [BASIC.HOS] },
]

const BASIC_WEIGHTS = {
  [BASIC.VM]: 25,
  [BASIC.HOS]: 25,
  [BASIC.DA]: 15,
  [BASIC.DF]: 15,
  [BASIC.UD]: 10,
  [BASIC.CI]: 10,
  [BASIC.HZ]: 0, // add-on when enabled
}

function sectionOrder(includeHazmat) {
  const order = [
    'Credentials & Registration',
    'Driver Qualification',
    'Drug & Alcohol',
    'HOS & ELD',
    'Vehicle Maintenance',
    'Accidents & Incident Management',
    ...(includeHazmat ? ['Hazardous Materials'] : []),
    'Safety Management & Training',
    'CSA/SMS Understanding',
  ]
  return order
}

function computeScores(answers, includeHazmat) {
  const sec = {}
  const perBasic = {}
  let total = 0
  let earned = 0

  for (const q of BANK) {
    if (!includeHazmat && q.section === 'Hazardous Materials') continue
    const a = answers[q.id]
    const weight = q.weight || 1
    total += weight

    let correct = false
    if (q.type === 'tf' || q.type === 'single') {
      correct = Array.isArray(a) && a.length === 1 && a[0] === q.correct[0]
    } else if (q.type === 'multi') {
      const sa = new Set(a || [])
      const sc = new Set(q.correct)
      correct = sa.size === sc.size && [...sa].every(x => sc.has(x))
    } else if (q.type === 'text') {
      // Free text: not scored, but counts toward section progress only
      correct = true
    }

    const gain = correct ? weight : 0
    earned += gain

    sec[q.section] = sec[q.section] || { earned: 0, total: 0 }
    sec[q.section].earned += gain
    sec[q.section].total += weight

    for (const tag of q.basicTag || []) {
      perBasic[tag] = perBasic[tag] || { earned: 0, total: 0 }
      perBasic[tag].earned += gain
      perBasic[tag].total += weight
    }
  }

  // Normalize BASICs by policy weights
  const weightedTotal = Object.entries(BASIC_WEIGHTS).reduce((s,[k,w]) => s + (k==='Hazmat'&&!includeHazmat?0:w), 0)
  let basicScore = 0
  for (const [k, obj] of Object.entries(perBasic)) {
    if (k === BASIC.HZ && !includeHazmat) continue
    const pct = obj.total ? obj.earned / obj.total : 0
    basicScore += pct * (BASIC_WEIGHTS[k] || 0)
  }
  const overallPct = (basicScore / (includeHazmat ? 100 : (100 - BASIC_WEIGHTS[BASIC.HZ]))) * 100

  return { sections: sec, perBasic, overallPct }
}

function Feedback({ perBasic, includeHazmat }) {
  const tips = []
  const pct = (b) => {
    const obj = perBasic[b] || { earned: 0, total: 0 }
    return obj.total ? Math.round((obj.earned / obj.total) * 100) : 0
  }

  if (pct(BASIC.HOS) < 80) tips.push('HOS <80% → add ELD exception training, supporting docs checklist, and unassigned driving SOP.')
  if (pct(BASIC.VM) < 80) tips.push('Vehicle Maintenance <80% → DVIR refresher, annual inspection reconciliation, and OOS repair tracking.')
  if (pct(BASIC.DF) < 85) tips.push('DQF <85% → audit Clearinghouse queries, prior employer verification, and annual MVR/review cadence.')

  return (
    <ul className="cq-small">
      {tips.map((t,i)=> <li key={i}>{t}</li>)}
      {!tips.length && <li>Great work—keep monitoring monthly CSA/SMS and schedule quarterly internal audits.</li>}
    </ul>
  )
}

export default function ComplianceQuiz({ companyName = 'Your Company', includeHazmat = false, onClose }) {
  const storageKey = `cq.answers.${companyName}.${includeHazmat?'hz':'nohz'}`
  const [answers, setAnswers] = useState(()=>{
    try { return JSON.parse(localStorage.getItem(storageKey)) || {} } catch { return {} }
  })
  const [idx, setIdx] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const orderedSections = sectionOrder(includeHazmat)
  const questions = useMemo(() => BANK.filter(q => orderedSections.includes(q.section)), [includeHazmat])
  const q = questions[idx]

  useEffect(()=>{ localStorage.setItem(storageKey, JSON.stringify(answers)) }, [answers])

  const progress = Math.round(((idx) / questions.length) * 100)

  const setAnswer = (qid, value) => setAnswers(a => ({ ...a, [qid]: value }))

  const next = () => {
    if (idx < questions.length - 1) setIdx(idx + 1)
    else setShowResults(true)
  }
  const prev = () => setIdx(Math.max(0, idx - 1))

  const { perBasic, overallPct } = useMemo(() => computeScores(answers, includeHazmat), [answers, includeHazmat])

  const gradeBadge = () => {
    if (overallPct >= 90) return <span className="badge ok">Green</span>
    if (overallPct >= 75) return <span className="badge warn">Yellow</span>
    return <span className="badge bad">Red</span>
  }

  const exportJson = () => {
    const payload = { companyName, includeHazmat, answers, computed: computeScores(answers, includeHazmat), ts: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(payload,null,2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `compliance-quiz-${companyName.replace(/\s+/g,'-').toLowerCase()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const printPage = () => window.print()

  const renderQuestion = (q) => {
    const a = answers[q.id] || (q.type==='multi' ? [] : q.type==='text'? '' : [])
    // Determine instant feedback: only after a selection exists for graded types
    const showInstant = (q.type==='tf' || q.type==='single' || q.type==='multi') && ((Array.isArray(a) ? a.length>0 : false))
    const isCorrectSingle = () => Array.isArray(a) && a.length===1 && a[0]===q.correct?.[0]
    const isCorrectMulti = () => {
      const sa = new Set(a||[]); const sc = new Set(q.correct||[])
      return sa.size===sc.size && [...sa].every(x=>sc.has(x))
    }

    if (q.type === 'tf' || q.type === 'single') {
      return (
        <div className="cq-choices">
          {q.choices.map((c, i) => (
            <label
              key={i}
              className={`cq-choice ${showInstant && (a?.[0]===i) ? ((i===q.correct?.[0])?'correct':'wrong') : ''}`}
              onClick={() => setAnswer(q.id, [i])}
            >
              <input type="radio" name={q.id} checked={(a?.[0] ?? -1) === i} onChange={() => setAnswer(q.id, [i])} />
              <span>{c}</span>
              {showInstant && (a?.[0]===i) && (
                <span className={`cq-flag ${i===q.correct?.[0]?'ok':'bad'}`}>{i===q.correct?.[0] ? 'Correct' : 'Try Again'}</span>
              )}
            </label>
          ))}
        </div>
      )
    }

    if (q.type === 'multi') {
      const setMulti = (i) => {
        const cur = new Set(a)
        if (cur.has(i)) cur.delete(i); else cur.add(i)
        setAnswer(q.id, [...cur].sort())
      }
      return (
        <div className="cq-choices">
          {q.choices.map((c, i) => (
            <label
              key={i}
              className={`cq-choice ${showInstant && a.includes(i) ? ((new Set(q.correct||[])).has(i)?'correct':'wrong') : ''}`}
              onClick={() => setMulti(i)}
            >
              <input type="checkbox" checked={a.includes(i)} onChange={() => setMulti(i)} />
              <span>{c}</span>
              {showInstant && a.includes(i) && (
                <span className={`cq-flag ${((new Set(q.correct||[])).has(i))?'ok':'bad'}`}>
                  {((new Set(q.correct||[])).has(i)) ? 'Correct' : 'Check'}
                </span>
              )}
            </label>
          ))}
        </div>
      )
    }

    if (q.type === 'text') {
      return (
        <textarea rows={3} style={{ width: '100%', padding: '.5rem' }} value={a} onChange={(e)=> setAnswer(q.id, e.target.value)} placeholder="Type your steps/policy here (not graded)"></textarea>
      )
    }

    return null
  }

  return (
    <section className="cq-wrap" aria-label="CMV Company Compliance Quiz">
      {onClose && (
        <button type="button" className="cq-close" aria-label="Close compliance quiz" onClick={onClose}>✕</button>
      )}

      <div className="cq-header">
        <span className="cq-dot" aria-hidden></span>
        <h2>Take the Compliance Quiz</h2>
      </div>
      <p className="cq-sub">Quick audit-readiness check mapped to CSA/SMS BASICs. All client-side; progress saved locally.</p>

      {!showResults ? (
        <>
          <div className="cq-progress">
            <div className="cq-bar"><span style={{ width: `${progress}%` }} /></div>
            <div className="cq-count">{idx+1} / {questions.length}</div>
          </div>

          <div className="cq-section-head">
            <div className="cq-section-title">{q.section}</div>
            <div className="cq-section-desc">{companyName} {includeHazmat ? '• Hazmat included' : ''}</div>
          </div>

          <div className="cq-card">
            <p className="cq-qtext">{q.text}</p>
            {renderQuestion(q)}
          </div>

          <div className="cq-controls">
            <div className="left">
              <button className="cq-btn secondary" onClick={prev} disabled={idx===0}>Back</button>
            </div>
            <div className="right">
              <button className="cq-btn secondary" onClick={()=> setShowResults(true)}>Skip to Results</button>
              <button
                className="cq-btn"
                onClick={next}
                disabled={(q.type==='tf'||q.type==='single') ? !((answers[q.id]||[]).length) : (q.type==='multi' ? !(answers[q.id]||[]).length : false)}
              >
                {idx < questions.length - 1 ? 'Next' : 'Finish'}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="cq-results">
          <h3>Results</h3>
          <div className="cq-badges">
            <span className="badge neutral">Overall: {Math.round(overallPct)}%</span>
            {gradeBadge()}
          </div>
          <h4>Action Plan</h4>
          <Feedback perBasic={perBasic} includeHazmat={includeHazmat} />
          <div className="cq-actions">
            <button className="cq-btn" onClick={exportJson}>Export JSON</button>
            <button className="cq-btn secondary" onClick={printPage}>Print</button>
            <button className="cq-btn" onClick={()=> { setShowResults(false); setIdx(0) }}>Retake</button>
          </div>
        </div>
      )}
    </section>
  )
}
