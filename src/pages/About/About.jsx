import GlobalHeader from '../../components/GlobalHeader'

export default function About() {
  return (
    <div className="fmcsa-page">
      <GlobalHeader />
      <section className="fmcsa-flowchart">
        <div className="container">
          <h2>About FixDQ</h2>
          <p className="fc-disclaimer" style={{ color: 'var(--color-gray-700)' }}>
            FixDQ helps drivers and fleets stay compliant with FMCSA rules using simple tools and guidance.
          </p>
          <div className="fc-panel">
            <p>
              We build easy-to-use checkers, references, and workflows so you can focus on safe operations, clean audits,
              and fewer surprises on the road. Explore our compliance tools, training resources, and step-by-step guidance.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
