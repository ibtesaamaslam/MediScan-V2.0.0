# MediScan Local - High-Fidelity UI Mockup & Style Code Matrix

## 1. High-Fidelity Diagnostic Card Panel Spec
This panel is designed for the `/screening/result` flow to communicate predictions clearly and without bias.

### Mockup Structure
```text
+-------------------------------------------------------+
|  Primary Pathology Hypothesis Match                   |
|  Psoriasis Vulgaris                                   |
|                                                       |
|  Confidence Level: [==== 91.2% ====] (Calibrated)     |
|  Pathology Severity: [ URGENT REFERRAL ]               |
|                                                       |
|  Differential Log Matches:                            |
|  - Eczema (Atopic): 6.1%                              |
|  - Seborrheic Dermatitis: 2.7%                        |
|                                                       |
|  Clinician Recommendation:                            |
|  Indicates hyperkeratinized epidermal structures.      |
|  Schedule localized topical assessment instantly.    |
+-------------------------------------------------------+
```

### Tailwind / StyleSheet Spec
For React Native / Tailwind CSS interfaces, apply these exact configuration guidelines to preserve visual fidelity:

```typescript
// React Native Style Object Mockup Mapping
const resultCardStyles = {
  container: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1', // High contrast border (Gray-300)
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    marginVertical: 16,
  },
  severityBadgeActive: {
    backgroundColor: '#fee2e2', // Soft red backplane
    borderColor: '#ef4444',     // Crimson indicator border
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#b91c1c',           // High contrast red text
    fontWeight: '700',
  },
  progressbarTrack: {
    height: 6,
    backgroundColor: '#e2e8f0', // Cool gray track
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 8,
  },
  progressbarIndicator: {
    height: '100%',
    backgroundColor: '#10b981', // Emerald green indicating high confidence
    borderRadius: 3,
  }
};
```

---

## 2. Interactive States & Micro-interactions
*   **Grid item click target (Hover style):** Transition from background white to light grayish-blue (`#f1f5f9`), shifting the border border from `#cbd5e1` to `#0284c7` (Sky Blue-600) to signify focus without relying on size scales.
*   **Disabled Inputs / Incomplete Consent Checkboxes:** Slate opacity of the main container is set strictly to `40%`, with buttons registering color `#94a3b8` and ignoring cursor hover events (`pointer-events: none`).
*   **Dynamic Loading Indicators:** A spinning loader structured as a dashed circular vector (`stroke-dasharray`, `ease-in-out` animation loops) overlaid elegantly over the central screen region.
