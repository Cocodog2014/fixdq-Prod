import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import StateRulesFinder from './StateRulesFinder'
import './state-rules.css'

// Public imperative API: ref.current.open() / ref.current.close()
const StateRulesDrawer = forwardRef(function StateRulesDrawer(_props, ref) {
	const [open, setOpen] = useState(false)
	const overlayRef = useRef(null)
	const drawerRef = useRef(null)

	const close = useCallback(() => setOpen(false), [])
	const openDrawer = useCallback(() => setOpen(true), [])

	useImperativeHandle(ref, () => ({ open: openDrawer, close }))

	// Body scroll lock
	useEffect(() => {
		if (open) {
			const prev = document.body.style.overflow
			document.body.style.overflow = 'hidden'
			return () => { document.body.style.overflow = prev }
		}
	}, [open])

		// Close on ESC + focus trap (Tab cycling inside drawer)
		useEffect(() => {
			if (!open) return
			const handleKey = (e) => {
				if (e.key === 'Escape') { e.preventDefault(); close(); return }
				if (e.key === 'Tab') {
					const root = drawerRef.current
					if (!root) return
					const focusables = root.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
					const list = Array.from(focusables).filter(el => !el.hasAttribute('disabled'))
					if (!list.length) return
					const first = list[0]
					const last = list[list.length - 1]
					if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
					else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
				}
			}
			window.addEventListener('keydown', handleKey)
			// Focus first interactive on open
			setTimeout(() => {
				const btn = drawerRef.current?.querySelector('button')
				btn && btn.focus()
			}, 0)
			return () => window.removeEventListener('keydown', handleKey)
		}, [open, close])

	// Click outside (overlay)
	const onOverlayClick = (e) => {
		if (e.target === overlayRef.current) close()
	}

	if (!open) return null

	return (
		<div className="sr-overlay" ref={overlayRef} onMouseDown={onOverlayClick} role="presentation">
			<div
				className="sr-drawer"
				role="dialog"
				aria-modal="true"
				aria-label="State-by-State FMCSA Rules finder"
				ref={drawerRef}
			>
				<header className="sr-drawer-head">
					<h2>State-by-State FMCSA Rules</h2>
					<button type="button" className="sr-close" onClick={close} aria-label="Close state rules drawer">✕</button>
				</header>
				<div className="sr-drawer-body">
					<StateRulesFinder onClose={close} />
				</div>
			</div>
		</div>
	)
})

export default StateRulesDrawer