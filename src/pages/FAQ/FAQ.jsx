import { useMemo, useState } from 'react'
import GlobalHeader from '../../components/GlobalHeader'
import './FAQ.css'

function Category({ idx, item, isOpen, onToggle }) {
  const [openQuestions, setOpenQuestions] = useState({})
  const toggleQ = (qi) => setOpenQuestions((s) => ({ ...s, [qi]: !s[qi] }))
  return (
    <div className={`faq-category c-${item.color}`}>
      <button className="faq-cat-header" onClick={() => onToggle(idx)} aria-expanded={isOpen}>
        <div className="left">
          <span className="emoji" aria-hidden>❓</span>
          <span className="title">{item.category}</span>
          <span className="count">{item.faqs.length} Qs</span>
        </div>
        <span className="chev" aria-hidden>{isOpen ? '▾' : '▸'}</span>
      </button>
      {isOpen && (
        <div className="faq-questions">
          {item.faqs.map((f, qi) => (
            <div key={qi} className={`faq-q ${openQuestions[qi] ? 'open' : ''}`}>
              <button className="q-head" onClick={() => toggleQ(qi)} aria-expanded={!!openQuestions[qi]}>
                <span className="q-text">{f.q}</span>
                <span className="q-icon" aria-hidden>{openQuestions[qi] ? '−' : '+'}</span>
              </button>
              {openQuestions[qi] && (
                <div className="q-body">
                  <p>{f.a}</p>
                  {f.links?.length ? (
                    <div className="q-links">
                      {f.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                      ))}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  // 10 categories × 10 questions = 100
  const faqData = useMemo(() => ([
    {
      category: 'CDL & Licensing', color: 'orange',
      faqs: [
        { q: 'What is a CDL?', a: 'A Commercial Driver’s License authorizes operating heavier or specialized commercial motor vehicles as defined by 49 CFR Part 383.' },
        { q: 'When is a Class A required?', a: 'Typically when GCWR is 26,001 lbs or more AND the towed unit is over 10,000 lbs.' },
        { q: 'When is a Class B required?', a: 'Usually for a single vehicle 26,001 lbs or more, or such a vehicle towing ≤ 10,000 lbs.' },
        { q: 'When is a Class C required?', a: 'Often for vehicles under A/B thresholds that carry 16+ passengers (including driver) or placarded HazMat.' },
  { q: 'Does intrastate vs interstate matter?', a: 'Yes. Interstate follows federal weight/definition thresholds (e.g., CMV ≥10,001 lb; CDL classes at ≥26,001 lb with trailer rules). Intrastate runs on your state’s thresholds and exemptions which may be stricter or looser—check your state DOT/DMV.' },
        { q: 'Do I always need a CDL over 26,001 lbs?', a: 'Commonly yes, but some exemptions (e.g., Covered Farm Vehicle) may apply. Verify with your DMV.' },
        { q: 'What counts toward GCWR?', a: 'Manufacturer ratings (GVWR/GCWR) and actual configurations. For Class A decisions, trailer rating >10,000 lbs is key.' },
        { q: 'Do rental trucks need a CDL?', a: 'If weight/usage meets CDL thresholds, yes. The rental status doesn’t exempt CDL requirements.' },
        { q: 'Is a CDL from one state valid in another?', a: 'Generally yes under reciprocity for interstate operations, subject to federal rules and endorsements.' },
        { q: 'How do I verify my CDL class?', a: 'Check your license card and state DMV record; they list class and any endorsements/restrictions.' },
      ]
    },
    {
      category: 'Endorsements & Restrictions', color: 'purple',
      faqs: [
        { q: 'What is a Tank (N) endorsement?', a: 'Required for certain quantities of bulk liquids in tanks or tank vehicles. See FMCSA for thresholds.' },
        { q: 'What is a HazMat (H) endorsement?', a: 'Needed to transport hazardous materials requiring placards. Requires TSA background and knowledge test.' },
        { q: 'What is an X endorsement?', a: 'Combined Tank + HazMat.' },
        { q: 'What is a Passenger (P) endorsement?', a: 'For transporting passengers above specific thresholds (often 16+ including driver).' },
        { q: 'What is a School Bus (S) endorsement?', a: 'For operating school buses; involves additional skills and background checks per state.' },
        { q: 'Do endorsements expire?', a: 'They usually follow license expiration but may have separate renewal checks (e.g., HazMat security threat assessment).'},
        { q: 'What are license restrictions?', a: 'Codes that limit driving conditions (e.g., air brakes restriction, automatic transmission only).'},
        { q: 'How do I remove an air brake restriction?', a: 'Pass an air brake knowledge and skills test in an air brake-equipped vehicle per state policy.' },
        { q: 'Is a doubles/triples endorsement needed for RVs?', a: 'Typically not for personal RVs; check state rules if operating commercially.' },
        { q: 'Do farm vehicles need endorsements?', a: 'If CFV exemption applies, some endorsements might not be required; confirm with your DMV.' },
      ]
    },
    {
      category: 'Hours of Service (HOS)', color: 'teal',
      faqs: [
        { q: 'What are the basic HOS limits?', a: '11-hour driving, 14-hour on-duty window, 30-minute break, and 60/70-hour weekly limits depending on carrier schedule.' },
        { q: 'What is the short-haul exception?', a: 'Exempts ELD use and some log requirements within time/distance limits when returning to the same reporting location.' },
        { q: 'How does the 34-hour reset work?', a: 'After 60/70 hours on duty in 7/8 days, 34 consecutive hours off resets the cycle.' },
        { q: 'Are there HOS exceptions for agriculture?', a: 'Yes, during planting/harvest and for Covered Farm Vehicles; details vary by state/program.' },
        { q: 'Do I need a 30-minute break?', a: 'Required after 8 hours of driving time. The break can be on-duty not driving in some cases.' },
        { q: 'Can I split sleeper berth?', a: 'Yes, common splits are 8/2 or 7/3 under certain conditions; both periods must add to 10 hours.' },
        { q: 'What is adverse driving conditions?', a: 'Allows up to 2 extra driving hours if unexpected conditions arise; document justification in logs.' },
        { q: 'How do personal conveyance rules work?', a: 'Off-duty use of CMV for personal reasons; cannot benefit the carrier. Must be properly annotated.' },
        { q: 'Do local delivery drivers need ELDs?', a: 'Short-haul exceptions may apply; otherwise, ELDs are generally required for most interstate drivers.' },
        { q: 'What triggers a log violation?', a: 'Exceeding limits, falsification, missing supporting documents, or device malfunctions not resolved per policy.' },
      ]
    },
    {
      category: 'Medical & Qualifications', color: 'green',
      faqs: [
        { q: 'Do I need a Medical Examiner’s Certificate?', a: 'Interstate CDL usually requires a valid medical card; some intrastate or exempt drivers differ by state.' },
        { q: 'Where do I get a medical exam?', a: 'From a provider on the National Registry of Certified Medical Examiners.' },
        { q: 'How long is a medical card valid?', a: 'Typically up to 2 years; shorter if health conditions require monitoring.' },
        { q: 'What if my medical card expires?', a: 'Renew promptly; your CDLs or privileges may be downgraded/suspended by your DMV if not current.' },
        { q: 'Are vision standards strict?', a: 'Yes. There are federal standards with some waiver pathways for certain conditions.' },
        { q: 'What medications disqualify me?', a: 'Controlled substances without a prescription or impairing meds can disqualify. Consult a certified examiner.' },
        { q: 'What are disqualifying conditions?', a: 'Certain cardiovascular, neurological, or respiratory issues may disqualify without waivers.' },
        { q: 'Do I need to carry the card?', a: 'Keep proof accessible; some states require self-certification and carrier records to be updated.' },
        { q: 'How do I self-certify my medical status?', a: 'Update your DMV with the correct category (NI, NA, etc.) and submit exam results as required.' },
        { q: 'Does a CFV exemption change medical rules?', a: 'Often yes for non-CDL CFV operations; verify state adoption and roles.' },
      ]
    },
    {
      category: 'Vehicle Inspections & Maintenance', color: 'blue',
      faqs: [
        { q: 'What is a DVIR?', a: 'Driver Vehicle Inspection Report—pre-trip, post-trip, and noted defects documentation.' },
        { q: 'Are annual inspections required?', a: 'Yes for CMVs under Part 396; proof must be retained and vehicle must pass.' },
        { q: 'What are common out-of-service items?', a: 'Brakes, tires, lighting, steering, securement, and critical leaks.' },
        { q: 'How long keep maintenance records?', a: 'Typically 1 year while the vehicle is in service and for 6 months after it leaves the carrier’s control.' },
        { q: 'Do trailers need inspections?', a: 'Yes. Trailers are CMVs and must meet inspection and maintenance requirements.' },
        { q: 'What about roadside inspections?', a: 'Cooperate, provide documents, and correct any violations; they impact CSA scores.' },
        { q: 'What is periodic inspection?', a: 'An annual or state-equivalent inspection covering specific FMCSA items.' },
        { q: 'Do I need reflective tape?', a: 'Most trailers and some trucks need conspicuity markings per FMVSS and FMCSA requirements.' },
        { q: 'How to document repairs?', a: 'Keep work orders, invoices, and DVIR close-out records.' },
        { q: 'Can I operate with a known defect?', a: 'No if the defect affects safety or violates out-of-service criteria.' },
      ]
    },
    {
      category: 'Hazardous Materials', color: 'red',
      faqs: [
        { q: 'When are placards required?', a: 'Placards depend on material class and quantity per 49 CFR 172.504.' },
        { q: 'Do I need HazMat training?', a: 'Yes—general awareness, function-specific, safety, security awareness, and in-depth security if applicable.' },
        { q: 'What is shipping paper format?', a: 'Must include proper shipping name, hazard class, ID number, packing group, and emergency contact.' },
        { q: 'Can I park near open flames?', a: 'HazMat has strict parking and attendance requirements; check class-specific rules.' },
        { q: 'Do I need a route plan?', a: 'Some materials require prescribed routes and restrictions (e.g., tunnels, city bans).'},
        { q: 'What is an ERG?', a: 'Emergency Response Guidebook—initial response information for first responders and drivers.' },
        { q: 'How to secure cylinders?', a: 'Upright, capped, and secured from movement; follow DOT and manufacturer guidance.' },
        { q: 'What’s segregation?', a: 'Preventing incompatible hazardous materials from contacting during transport—follow HM Table notes.' },
        { q: 'Do farm operations need HazMat?', a: 'Ag operations can have limited quantity or exception cases; placards still apply at thresholds.' },
        { q: 'Do I need an HME background check?', a: 'Yes, TSA Security Threat Assessment is required for H endorsement.' },
      ]
    },
    {
      category: 'ELD & Records', color: 'yellow',
      faqs: [
        { q: 'Do I need an ELD?', a: 'Most interstate carriers do unless an exception applies (e.g., short-haul, driveaway-towaway, pre-2000 engine).'},
        { q: 'What if the ELD malfunctions?', a: 'Reconstruct logs for up to 8 days, annotate, and repair/replace per policy; keep records available.' },
        { q: 'How long retain supporting documents?', a: 'Commonly 6 months for HOS, with a back-up copy; verify your policy.' },
        { q: 'How to certify logs?', a: 'Drivers must review and certify daily; carriers must ensure no conflicts or missing records.' },
        { q: 'Can edits be made?', a: 'Yes with annotations; drivers must re-certify. Edits cannot conceal violations.' },
        { q: 'What is unassigned driving?', a: 'Miles recorded without a driver logged in; carriers must review and assign appropriately.' },
        { q: 'How to handle yard moves?', a: 'Use dedicated yard-move status if supported; off public roads and per company policy.' },
        { q: 'Personal conveyance on ELD?', a: 'Log as off-duty PC with annotations and follow FMCSA guidance on limits and intent.' },
        { q: 'Can I use a phone as ELD?', a: 'Only if it’s an FMCSA-registered device with required integrality and mounting; check registry.' },
        { q: 'How to transfer logs at inspection?', a: 'Use ELD transfer (telematics or local) and provide display/printouts on request.' },
      ]
    },
    {
      category: 'FMCSA Registration & Numbers', color: 'pink',
      faqs: [
        { q: 'Do I need a USDOT number?', a: 'Required for most interstate carriers and some intrastate carriers depending on state thresholds.' },
        { q: 'What is an MC number?', a: 'Interstate for-hire carriers often need operating authority (MC) in addition to USDOT.' },
        { q: 'How to update MCS-150?', a: 'Update at least every 24 months or when information changes; penalties may apply for failure to update.' },
        { q: 'What is BOC-3?', a: 'Process agent filing for interstate authority carriers; needed to complete operating authority.' },
        { q: 'What is a safety audit?', a: 'New entrant audit assessing basic safety management controls early in operation.' },
        { q: 'What is a DOT PIN?', a: 'Personal Identification Number used to access FMCSA online systems.' },
        { q: 'Do I need UCR?', a: 'Unified Carrier Registration applies to most interstate carriers and certain brokers/forwarders.' },
        { q: 'What is IFTA/IRP?', a: 'Fuel tax agreement and apportioned plates for multi-state operations with qualifying vehicles.' },
        { q: 'How to check carrier safety scores?', a: 'Use FMCSA’s SAFER and SMS portals to review inspections, crashes, and BASICs.' },
        { q: 'Can private carriers skip authority?', a: 'Private carriers may not need MC authority but still need USDOT and compliance programs.' },
      ]
    },
    {
      category: 'Farm Vehicles & Agriculture', color: 'lime',
      faqs: [
        { q: 'What is a Covered Farm Vehicle (CFV)?', a: 'A vehicle meeting 49 CFR 390.5/390.39 definition, operated by farmer/family/employee for ag use, not for-hire, within limits.' },
        { q: 'Is CDL required for CFV?', a: 'Often not within CFV rules and 150 air-miles window; heavy vehicles may have conditional relief.' },
        { q: 'Are medical cards required for CFV?', a: 'Commonly not for non-CDL CFV intrastate, but verify state adoption and documentation.' },
        { q: 'Does CFV apply interstate?', a: 'Varies by state adoption and enforcement; confirm before crossing state lines.' },
        { q: 'Do farm plates matter?', a: 'Some states require plates/designation to claim CFV benefits; carry proof if issued.' },
        { q: 'Are HazMat loads exempt under CFV?', a: 'Placarded HazMat generally disqualifies CFV exemptions.' },
        { q: 'Is for-hire ag hauling allowed?', a: 'For-hire typically voids CFV relief; remain private carriage for your own farm.' },
        { q: 'What documentation should I carry?', a: 'Registration, insurance, any state CFV card/plate docs, and supporting proof of agricultural purpose.' },
        { q: 'Do weight limits still apply?', a: 'Yes. CFV doesn’t waive axle/bridge limits or size/weight permits.' },
        { q: 'Where to find state CFV rules?', a: 'Check your DMV/DOT site and FMCSA resources; rules vary by state.' },
      ]
    },
    {
      category: 'State & Intrastate Rules', color: 'indigo',
      faqs: [
  { q: 'Interstate vs Intrastate: how do rules differ?', a: 'Interstate operations follow federal thresholds (for example, CDL weight triggers typically start at 26,001 lb GCWR/GVWR and CMV at 10,001 lb). Intrastate operations are governed by your state and may mirror or modify those thresholds and exemptions (farm, short‑haul, medical, etc.). Always verify with your state DOT/DMV before you operate.' },
  { q: 'Do states adopt FMCSA fully?', a: 'Most adopt core rules with variations. Always verify your state’s specific requirements.' },
        { q: 'Are medical rules different intrastate?', a: 'Some states relax medical/CDL needs for intrastate only; check DMV policy.' },
        { q: 'Do HOS change intrastate?', a: 'Some states have intrastate HOS for local carriers; confirm allowed distances and duty limits.' },
        { q: 'Do I need a state DOT number?', a: 'A few states issue their own intrastate DOT numbers or motor carrier IDs.' },
        { q: 'Are permits needed for heavy/oversize?', a: 'Yes—permits and routing are state-managed; CFV doesn’t waive those.' },
        { q: 'Do passengers rules vary?', a: 'Thresholds and definitions can vary; check your DMV and statutes.' },
        { q: 'How to check enforcement bulletins?', a: 'State DOT/DMV or Highway Patrol websites publish guidance and updates.' },
        { q: 'What about emissions and inspections?', a: 'States may require periodic emissions or safety inspections beyond federal minimums.' },
        { q: 'Is concealed carry addressed?', a: 'Firearms policies vary widely and are outside FMCSA scope; follow state law.' },
        { q: 'Where to ask questions locally?', a: 'Call your state DOT/DMV commercial division for authoritative answers.' },
      ]
    },
  ]), [])

  const [openCats, setOpenCats] = useState({ 0: true })
  const toggleCat = (i) => setOpenCats((s) => ({ ...s, [i]: !s[i] }))

  return (
    <div className="fmcsa-page">
      <GlobalHeader />
      <section className="faq-page">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <p className="faq-intro">Explore by category. Click a category to see questions, then click a question to reveal the answer.</p>
          {/* Note moved into the State & Intrastate Rules category for cleaner layout */}

          <div className="faq-grid">
            {faqData.map((item, i) => (
              <Category key={item.category} idx={i} item={item} isOpen={!!openCats[i]} onToggle={toggleCat} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
