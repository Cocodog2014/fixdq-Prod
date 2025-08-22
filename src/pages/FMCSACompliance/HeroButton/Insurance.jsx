import './Insurance.css'
export default function Insurance({ active, onClick }) { return (<button type="button" className={`hero-top-btn hero-top-btn--outline hero-btn--insurance ${active ? 'active' : ''}`} aria-pressed={active} onClick={onClick}><span className="hero-top-emoji" aria-hidden="true">🛡️</span><span>Insurance Requirements</span></button>) }
