import './ManageReg.css'
export default function ManageReg({ active, onClick }) { return (<button type="button" className={`hero-top-btn hero-top-btn--outline hero-btn--managereg ${active ? 'active' : ''}`} aria-pressed={active} onClick={onClick}><span className="hero-top-emoji" aria-hidden="true">🗂️</span><span>Manage Registration</span></button>) }
