# Screen Specification Index Matrix

## 1. Onboarding Flow (`onboarding/`)
| File Path | Functional Role | Core Widgets Required |
| :--- | :--- | :--- |
| `welcome.tsx` | Entry splash and title layout. | `Big Title display`, `Begin Onboarding button` |
| `consent.tsx` | Privacy/informed consent form. | `Scroll container`, `Consent Checkboxes`, `Next Button` |
| `language.tsx` | App-wide locale switch. | `Language Select cards`, `i18n trigger` |
| `permissions.tsx` | Camera & storage driver request. | `Permission indicators`, `Request Trigger buttons` |
| `completed.tsx` | Final onboarding confirmation screen. | `Check Animation vector`, `Proceed to Dashboard Button` |

---

## 2. Dashboard Hub (`dashboard/`)
*   `home.tsx` - Primary clinician screen featuring connection status, localized quick start screening tiles, and recent scan shortcuts.
*   `stats.tsx` - High-density diagnostic summaries, local precision metrics, total synced cases, and pending upload tickers.

---

## 3. Pathology Screening Steps (`screening/`)
*   `skin.tsx` / `eye.tsx` / `oral.tsx` - Categories targeting model categories, carrying historical benchmarks.
*   `capture.tsx` - Guided cameras viewfinder screen detailing alignment bounds, focus tracking parameters, and lux calculations.
*   `review.tsx` - Post-capture photo verification panel. Re-crop before launching ONNX pipeline.
*   `processing.tsx` - Dedicated model compute loading status showing progression meters.
*   `result.tsx` - Outputs the calibrated pathology hypotheses, Platt confidence margins, severity badges, and clinicians recommendations.
*   `inconclusive.tsx` - Safety fallback shown when prediction values are strictly below the 70% threshold.
*   `referral.tsx` - Administrative clinic referral logger. Outputs clinical contact details in local languages if indicators warrant immediate hospital followups.

---

## 4. History Roster (`history/`)
*   `index.tsx` - Lists all historic clinic data matching searching keywords and filters.
*   `[id].tsx` - Detailed view node matching individual screening log numbers. Carries PDF report triggers.

---

## 5. Developer Diagnostic Panel (`developer/`)
- `diagnostics.tsx` - Entry diagnostic sandbox link tree.
- `model-status.tsx` - Reviews status of model ONNX files, manifest file versions, and checksum hashes.
- `benchmark.tsx` - Triggers memory leak tests, median FPS measures, and CPU heat monitors to avoid thermal crashes.
- `calibration.tsx` - Displays Platt temperature scaling calculations.
