import { useState } from 'react'
import './NewReg.css'

// Hero button trigger (default export)
export default function NewReg({ active, onClick }) {
	return (
		<button
			type="button"
			className={`hero-top-btn hero-top-btn--outline hero-btn--newreg ${active ? 'active' : ''}`}
			aria-pressed={active}
			onClick={onClick}
		>
			<span className="hero-top-emoji" aria-hidden="true">📝</span>
			<span>New Registration Made Easy</span>
		</button>
	)
}

// Panel component to show detailed bilingual guide
export function NewRegPanel({ onClose }) {
	const [lang, setLang] = useState('en')
	const t = lang === 'en' ? en : es

	return (
		<div className="info-panel newreg-panel" role="region" aria-label={t.title}>
			<button className="newreg-close" onClick={onClose} aria-label={lang==='en'?'Close panel':'Cerrar panel'}>&times;</button>
			<header className="newreg__header">
				<div className="newreg__badge">{t.badge}</div>
				<h2 className="newreg__title">{t.title}</h2>
				<p className="newreg__subtitle">{t.subtitle}</p>
				<div className="newreg__lang" role="tablist" aria-label="Language selector">
					<button
						className={`newreg__langbtn ${lang==='en'?'is-active':''}`}
						onClick={() => setLang('en')}
						aria-pressed={lang==='en'}
					>English</button>
					<button
						className={`newreg__langbtn ${lang==='es'?'is-active':''}`}
						onClick={() => setLang('es')}
						aria-pressed={lang==='es'}
					>Español</button>
				</div>
			</header>

			<div className="newreg__grid">
				<Card title={t.cards.whatTitle} body={t.cards.whatBody} />
				<Card title={t.cards.whoTitle} body={t.cards.whoBody} />
				<Card title={t.cards.needTitle} body={<NeedsList t={t} />} />
			</div>

			<div className="newreg__paths">
				<PathCard
					title={t.paths.newTitle}
						bullets={t.paths.newBullets}
						ctaLabel={t.paths.newCta}
						ctaHref="https://urs.fmcsa.dot.gov/"
				/>
				<PathCard
					title={t.paths.haveTitle}
					bullets={t.paths.haveBullets}
					ctaLabel={t.paths.haveCta}
					ctaHref="https://portal.fmcsa.dot.gov/"
				/>
			</div>

			<Accordion label={t.steps.label} items={t.steps.items} />

			<div className="newreg__links">
				<h3>{t.linksTitle}</h3>
				<ul>
					<li><a href="https://urs.fmcsa.dot.gov/" target="_blank" rel="noreferrer">{t.linkURS}</a></li>
					<li><a href="https://portal.fmcsa.dot.gov/" target="_blank" rel="noreferrer">{t.linkPortal}</a></li>
					<li><a href="https://www.fmcsa.dot.gov/registration/insurance-requirements" target="_blank" rel="noreferrer">{t.linkInsurance}</a></li>
					<li><a href="https://www.fmcsa.dot.gov/registration/state-registration-records-systems" target="_blank" rel="noreferrer">{t.linkState}</a></li>
					<li><a href="https://www.fmcsa.dot.gov/registration/new-entrant-safety-assurance-program" target="_blank" rel="noreferrer">{t.linkNewEntrant}</a></li>
				</ul>
			</div>
			<footer className="newreg__footer"><small>{t.updated}</small></footer>
		</div>
	)
}

function Card({ title, body }) {
	return (
		<div className="newreg__info">
			<h3 className="newreg__infoTitle">{title}</h3>
			<div className="newreg__infoBody">{body}</div>
		</div>
	)
}

function NeedsList({ t }) {
	return (
		<ul className="newreg__list">
			<li><strong>{t.needs.usdot}</strong> — {t.needs.usdotDesc}</li>
			<li><strong>{t.needs.mc}</strong> — {t.needs.mcDesc}</li>
			<li><strong>{t.needs.hm}</strong> — {t.needs.hmDesc}</li>
		</ul>
	)
}

function PathCard({ title, bullets, ctaLabel, ctaHref }) {
	return (
		<div className="newreg__path">
			<h3>{title}</h3>
			<ul className="newreg__pathList">
				{bullets.map((b, i) => <li key={i}>{b}</li>)}
			</ul>
			<a className="newreg__cta" href={ctaHref} target="_blank" rel="noreferrer">{ctaLabel}</a>
		</div>
	)
}

function Accordion({ label, items }) {
	const [openIndex, setOpenIndex] = useState(0)
	return (
		<div className="newreg__accordion" role="region" aria-label={label}>
			<h3 className="newreg__stepsTitle">{label}</h3>
			{items.map((item, i) => (
				<div key={i} className="newreg__accItem">
					<button
						className="newreg__accBtn"
						aria-expanded={openIndex===i}
						onClick={() => setOpenIndex(openIndex===i ? -1 : i)}
					>
						<span>{i+1}. {item.title}</span>
					</button>
					{openIndex===i && (
						<div className="newreg__accPanel">
							<ul>
								{item.points.map((p, j) => <li key={j}>{p}</li>)}
							</ul>
						</div>
					)}
				</div>
			))}
		</div>
	)
}

const en = {
	badge: 'Getting Started with Registration',
	title: 'FMCSA Registration — Plain Language Guide',
	subtitle: 'Figure out what you need (USDOT, Operating Authority, HazMat Permit) and where to start.',
	cards: {
		whatTitle: 'What is FMCSA registration?',
		whatBody: (
			<p>FMCSA enforces safety and commercial rules for motor carriers and bus companies. Most companies need <strong>Safety Registration (USDOT)</strong>; some also need <strong>Operating Authority (MC)</strong>.</p>
		),
		whoTitle: 'Who is covered?',
		whoBody: (
			<p>Motor Carriers, Brokers, Freight Forwarders, Intermodal Equipment Providers, and Cargo Tank Facilities. Your needs depend on your cargo, how you operate (for-hire/private), and where you run (interstate/intrastate).</p>
		),
		needTitle: 'What might you need?'
	},
	needs: {
		usdot: 'USDOT Number',
		usdotDesc: 'Required for most companies subject to FMCSA safety rules.',
		mc: 'Operating Authority (MC Number)',
		mcDesc: 'Needed for for-hire carriers transporting regulated commodities in interstate commerce (and others).',
		hm: 'Hazardous Materials Safety Permit',
		hmDesc: 'Needed if you haul certain quantities/classes of hazardous materials.'
	},
	paths: {
		newTitle: 'I\'m new (no USDOT / no Authority)',
		newBullets: [
			'Apply online in the Unified Registration System (URS)',
			'Pick your business type (Carrier, Broker, FF, IEP, Cargo Tank)',
			'Pay fees and submit required details'
		],
		newCta: 'Apply in URS',
		haveTitle: 'I already have a USDOT or MC',
		haveBullets: [
			'Create / sign in to your FMCSA Portal',
			'Make changes to company info, vehicles, MCS-150, etc.'
		],
		haveCta: 'Open FMCSA Portal'
	},
	steps: {
		label: 'Steps in the Process',
		items: [
			{ title: 'Determine what you need', points: ['USDOT Number (safety registration)', 'Operating Authority (MC) if for-hire/non-exempt interstate', 'HazMat Safety Permit, if applicable'] },
			{ title: 'Apply or manage online', points: ['New? Use URS to apply', 'Already registered? Use the FMCSA Portal to update'] },
			{ title: 'Insurance, BOC-3, and state requirements', points: ['Meet FMCSA insurance levels and file with your insurer', 'File BOC-3 (process agent)', 'Check state registration / UCR / IRP / IFTA as needed'] },
			{ title: 'New Entrant Safety Assurance Program', points: ['You\'ll be monitored for ~18 months', 'Expect a safety audit early in the period'] },
			{ title: 'Maintain and update', points: ['Update MCS-150 (at least every 24 months)', 'Keep insurance and operating authority active'] }
		]
	},
	linksTitle: 'Official Links',
	linkURS: 'Unified Registration System (Apply)',
	linkPortal: 'FMCSA Portal (Manage / Update)',
	linkInsurance: 'FMCSA Insurance Requirements',
	linkState: 'State Registration & UCR/IRP/IFTA',
	linkNewEntrant: 'New Entrant Safety Assurance Program',
	updated: 'Last updated: May 8, 2025'
}

const es = {
	badge: 'Primeros pasos con el registro',
	title: 'Registro de la FMCSA — Guía en lenguaje sencillo',
	subtitle: 'Averigüe qué necesita (USDOT, Autoridad Operativa, Permiso de Materiales Peligrosos) y dónde empezar.',
	cards: {
		whatTitle: '¿Qué es el registro de la FMCSA?',
		whatBody: (
			<p>La FMCSA aplica reglas de seguridad y comerciales para empresas de camiones y autobuses. La mayoría necesita <strong>registro de seguridad (USDOT)</strong>; algunas también necesitan <strong>Autoridad Operativa (MC)</strong>.</p>
		),
		whoTitle: '¿Quién está incluido?',
		whoBody: (
			<p>Transportistas, Corredores (Brokers), Agentes de Carga (Freight Forwarders), Proveedores de Equipo Intermodal y Instalaciones de Tanques de Carga. Sus requisitos dependen del tipo de carga, su forma de operar (contratado/privado) y dónde opera (interestatal/intrastatal).</p>
		),
		needTitle: '¿Qué podría necesitar?'
	},
	needs: {
		usdot: 'Número USDOT',
		usdotDesc: 'Requerido para la mayoría de las empresas sujetas a las reglas de seguridad de la FMCSA.',
		mc: 'Autoridad Operativa (Número MC)',
		mcDesc: 'Necesario para transportistas por contrato que mueven mercancías reguladas entre estados (y otros casos).',
		hm: 'Permiso de Seguridad para Materiales Peligrosos',
		hmDesc: 'Necesario si transporta ciertas cantidades/clases de materiales peligrosos.'
	},
	paths: {
		newTitle: 'Soy nuevo (sin USDOT / sin Autoridad)',
		newBullets: [
			'Solicite en línea en el Sistema Unificado de Registro (URS)',
			'Elija su tipo de negocio (Transportista, Broker, FF, IEP, Tanques)',
			'Pague tarifas y envíe la información requerida'
		],
		newCta: 'Solicitar en URS',
		haveTitle: 'Ya tengo USDOT o MC',
		haveBullets: [
			'Cree/inicie sesión en el Portal de la FMCSA',
			'Actualice información de la empresa, vehículos, MCS-150, etc.'
		],
		haveCta: 'Abrir Portal FMCSA'
	},
	steps: {
		label: 'Pasos del proceso',
		items: [
			{ title: 'Defina lo que necesita', points: ['Número USDOT (registro de seguridad)', 'Autoridad Operativa (MC) si es contratado/no exento interestatal', 'Permiso de Materiales Peligrosos, si aplica'] },
			{ title: 'Solicite o gestione en línea', points: ['¿Nuevo? Use URS para solicitar', '¿Ya registrado? Use el Portal FMCSA para actualizar'] },
			{ title: 'Seguro, BOC-3 y requisitos estatales', points: ['Cumpla niveles de seguro y archivo con su aseguradora', 'Presente BOC-3 (agente de proceso)', 'Revise registro estatal / UCR / IRP / IFTA según necesidad'] },
			{ title: 'Programa de Aseguramiento de la Seguridad para Nuevos Ingresos', points: ['Monitoreo por ~18 meses', 'Espere una auditoría de seguridad al inicio'] },
			{ title: 'Mantenga y actualice', points: ['Actualice MCS-150 (al menos cada 24 meses)', 'Mantenga el seguro y la autoridad operativa activos'] }
		]
	},
	linksTitle: 'Enlaces oficiales',
	linkURS: 'Sistema Unificado de Registro (Solicitar)',
	linkPortal: 'Portal de la FMCSA (Gestionar / Actualizar)',
	linkInsurance: 'Requisitos de seguro de la FMCSA',
	linkState: 'Registro estatal y UCR/IRP/IFTA',
	linkNewEntrant: 'Programa de Nuevos Ingresos',
	updated: 'Última actualización: 8 de mayo de 2025'
}
