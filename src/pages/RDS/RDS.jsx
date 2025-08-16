import GlobalHeader from '../../components/GlobalHeader';

function RDS() {
  return (
    <div className="rds-page app">
      <GlobalHeader />

      <section className="rds-hero">
        <div className="container">
          <h1>Records of Duty Status (RODS)</h1>
          <p className="subtitle">ELD vs Paper: When each is allowed or not allowed</p>
        </div>
      </section>

      <section className="rds-content">
        <div className="container">
          <div className="grid">
            <div className="card blue-border">
              <h3>Electronic Logging Device (ELD)</h3>
              <ul className="allowed">
                <li>Property-carrying CMVs operating in interstate commerce (general rule)</li>
                <li>Short-haul drivers who exceed limits and must use RODS for &gt; 8 days in any 30-day period</li>
                <li>Drivers previously exempt who no longer qualify under an exception</li>
              </ul>
              <ul className="not-allowed">
                <li>When the ELD is malfunctioning and a paper log is required temporarily</li>
                <li>For drivers who qualify for paper RODS exceptions (see Paper section)</li>
              </ul>
            </div>

            <div className="card green-border">
              <h3>Paper RODS</h3>
              <ul className="allowed">
                <li>Short-haul exception (150 air-mile radius) when no RODS are required</li>
                <li>Drivers using paper for not more than 8 days in any 30-day period due to ELD malfunction</li>
                <li>Driveaway-towaway operations where the vehicle driven is part of the shipment</li>
                <li>Vehicles manufactured before model year 2000</li>
              </ul>
              <ul className="not-allowed">
                <li>When driver is required to use an ELD and no qualifying exception applies</li>
              </ul>
            </div>
          </div>

          <div className="notes">
            <p className="disclaimer">Always verify current FMCSA regulations and company policy. This guide is informational only.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RDS;
