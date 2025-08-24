import React, { useCallback, useEffect, useMemo, useState } from 'react'
import statesData from './states.json'

// Minimal analytics helper (no-op if gtag absent)
function track(event, params) {
	try { window.gtag && window.gtag('event', event, params) } catch (_) { /* noop */ }
}

export default function StateRulesFinder({ onClose }) {
	const [query, setQuery] = useState('')
	const [selected, setSelected] = useState(null)

	// Parse ?state=XX deep link
	useEffect(() => {
		const sp = new URLSearchParams(window.location.search)
		const code = sp.get('state')?.toUpperCase()
		if (code) {
			const match = statesData.find(s => s.code === code)
			if (match) setSelected(match)
		}
	}, [])

	const list = useMemo(() => {
		const q = query.trim().toLowerCase()
		if (!q) return statesData
		return statesData.filter(s => s.name.toLowerCase().includes(q) || s.code.toLowerCase() === q)
	}, [query])

	const select = useCallback((st) => {
		setSelected(st)
		track('state_rules_select', { state: st.code })
	}, [])

	const makeSearch = (st, term) => {
		const q = encodeURIComponent(`${st.name} ${term}`)
		return `https://www.google.com/search?q=${q}`
	}

	return (
		<div className="sr-finder">
			<div className="sr-finder-head" style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
				<p className="sr-subtext">Intrastate nuances & enforcement references. Always verify locally.</p>
			</div>
			<div className="sr-finder" aria-label="State rules finder">
				<div className="sr-controls">
					<input
						className="sr-input"
						type="search"
						placeholder="Search state (e.g., Texas or TX)"
						value={query}
						onChange={e => setQuery(e.target.value)}
						aria-label="Search state"
					/>
					{query && <button className="sr-clear" onClick={() => setQuery('')} aria-label="Clear search">Clear</button>}
				</div>
				<div className="sr-grid" role="list">
					{list.map(st => (
						<button
							key={st.code}
							type="button"
							className={`sr-state-btn ${selected?.code === st.code ? 'active' : ''}`}
							onClick={() => select(st)}
							aria-pressed={selected?.code === st.code}
						>
							<span className="sr-name">{st.name}</span>
						</button>
					))}
				</div>
				{selected ? (
					<div className="sr-detail" key={selected.code}>
						<h3>{selected.name} ({selected.code})</h3>
						<ul className="sr-links">
							<li><a href={makeSearch(selected,'commercial motor vehicle intrastate rules')} target="_blank" rel="noopener noreferrer">Intrastate CMV Rules</a></li>
							<li><a href={makeSearch(selected,'oversize overweight permits')} target="_blank" rel="noopener noreferrer">Oversize / Overweight</a></li>
							<li><a href={makeSearch(selected,'commercial vehicle enforcement handbook PDF')} target="_blank" rel="noopener noreferrer">Enforcement Handbook</a></li>
							<li><a href={makeSearch(selected,'CDL intrastate medical waiver')} target="_blank" rel="noopener noreferrer">CDL / Medical Waivers</a></li>
						</ul>
						<ul className="sr-notes">
							<li>Confirm medical, short‑haul, & weight thresholds differing from federal.</li>
							<li>Direct sources preferred over secondary summaries.</li>
						</ul>
					</div>
				) : (
					<p className="sr-empty">Select a state above for quick reference links.</p>
				)}
			</div>
			<div className="sr-footer">
				<span>Draft reference tool</span>
				<span aria-hidden className="sr-emoji-truck">🚚</span>
			</div>
		</div>
	)
}