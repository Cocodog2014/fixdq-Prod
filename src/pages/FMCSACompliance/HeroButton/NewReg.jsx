import './NewReg.css'
export default function NewReg({ active, onClick }) { return (<button type="button" className={`hero-top-btn hero-top-btn--outline hero-btn--newreg ${active ? 'active' : ''}`} aria-pressed={active} onClick={onClick}><span className="hero-top-emoji" aria-hidden="true">📝</span><span>New Registration Made Easy</span></button>) }
