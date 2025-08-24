import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState, Suspense, lazy } from 'react'
import './WeightCalculator.css'

// Lazy load the heavy calculator component
const WeightCalculator = lazy(() => import('./WeightCalculator.jsx'))

// Imperative drawer API similar to StateRulesDrawer: ref.current.open()/close()
const WeightCalculatorDrawer = forwardRef(function WeightCalculatorDrawer(_props, ref) {
  const [open, setOpen] = useState(false)
  const overlayRef = useRef(null)
  const drawerRef = useRef(null)
  const lastFocus = useRef(null)

  const close = useCallback(() => setOpen(false), [])
  const openDrawer = useCallback(() => setOpen(true), [])
  useImperativeHandle(ref, () => ({ open: openDrawer, close }))

  // Body scroll lock + focus restore
  useEffect(() => {
    if (!open) return
    lastFocus.current = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prevOverflow; lastFocus.current?.focus?.() }
  }, [open])

  // ESC + focus trap
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); close() }
      if (e.key === 'Tab') {
        const root = drawerRef.current; if (!root) return
        const focusables = root.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        const list = Array.from(focusables).filter(el => !el.hasAttribute('disabled'))
        if (!list.length) return
        const first = list[0]; const last = list[list.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    // focus first element asynchronously
    setTimeout(() => {
      const first = drawerRef.current?.querySelector('button, input, select')
      first?.focus()
    }, 0)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  const onOverlayMouseDown = (e) => { if (e.target === overlayRef.current) close() }

  // Swipe down to close (mobile)
  useEffect(() => {
    if (!open) return
    let startY = null
    const onStart = (e) => { startY = e.touches?.[0]?.clientY ?? null }
    const onMove = (e) => {
      if (startY == null) return
      const dy = (e.touches?.[0]?.clientY ?? 0) - startY
      if (dy > 80) { close(); startY = null }
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    return () => { window.removeEventListener('touchstart', onStart); window.removeEventListener('touchmove', onMove) }
  }, [open, close])

  if (!open) return null
  return (
    <div className="wc-overlay" ref={overlayRef} onMouseDown={onOverlayMouseDown} role="presentation">
      <div className="wc-drawer" role="dialog" aria-modal="true" aria-label="Bridge & Axle Weight Planner" ref={drawerRef}>
        <header className="wc-drawer-head">
          <h2>Bridge & Axle Weight Planner</h2>
          <button type="button" className="wc-close-btn" onClick={close} aria-label="Close weight planner">Close</button>
        </header>
        <div className="wc-drawer-body">
          <Suspense fallback={<div className="sr-loading">Loading…</div>}>
            <WeightCalculator onClose={close} />
          </Suspense>
        </div>
      </div>
    </div>
  )
})

export default WeightCalculatorDrawer
