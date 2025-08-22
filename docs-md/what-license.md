# What License Tool Component

The WhatLicense flowchart / decision helper was split from `FMCSACompliance.jsx` into:

- `src/pages/FMCSACompliance/WhatLicense.jsx` – React component & logic
- `src/pages/FMCSACompliance/WhatLicense.css` – component-specific styles

Shared styles for flowchart elements (classes prefixed with `.fc-`) still reside in `FMCSACompliance.css` because other pages reuse them (e.g., Farm Exemption Checker). If more tools adopt those styles, consider extracting them into `FlowchartBase.css` and importing where needed.

## Import
The component self-imports its local CSS:
```jsx
import './WhatLicense.css'
```
No additional action required on consuming pages beyond:
```jsx
import WhatLicense from './WhatLicense'
```

## State Contract
`<WhatLicense state={licenseState} setState={setLicenseState} />`
- `state`: object with keys: `vehicleType, gvwr, operatingArea, cargoType, trailer, passengerCount, tankLiquids, placardedHazmat, farmExemption, schoolBus`.
- `setState`: state setter (prev => newState)

## Result Structure
Uses `computeLicenseResult(state)` returning:
```ts
{
  cdlClass: string,
  endorsements: string[],
  notes: string[],
  references: { label: string; href: string }[]
}
```

## Next Ideas
- Add print/export button for results.
- Provide shareable permalink with encoded state.
- Introduce a11y improvements: keyboard loop & ARIA grouping.
- Lazy load heavy logic if expanded further.
