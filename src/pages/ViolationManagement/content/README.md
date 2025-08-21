# Violation Management Content

This folder stores JSON datasets for the Violations domain. Keep files small and category‑scoped so they are easy to review and import.

Conventions:
- Schema: { code, description, severity (1–10), recommendedAction }
- File names: PascalCase by category. Example: `Brakes.json`, `LightingElectricalConspicuity.json`.
- Import from UI pages via dynamic fetch or static import depending on bundle size.

Included:
- MostCommon.json – high‑impact, frequently cited violations with quick fixes.

Future:
- Add category datasets provided by operations (Brakes, Wheels, SafeLoading, Lighting, DriverQualifications, Frame, PaperLogs, ELD, Coupling, Safety, Exhaust, Suspension, Steering, Tires, InspectionOther).
