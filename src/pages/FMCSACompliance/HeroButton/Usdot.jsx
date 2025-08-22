import './Usdot.css'
export default function Usdot({ active, onClick }) { return (<button type="button" className={`hero-top-btn hero-top-btn--outline hero-btn--usdot ${active ? 'active' : ''}`} aria-pressed={active} onClick={onClick}><span className="hero-top-emoji" aria-hidden="true">🚚</span><span>Do I Need a USDOT Number?</span></button>) }
