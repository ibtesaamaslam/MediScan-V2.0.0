# Onboarding Workflow & Technical Document

## 1. Sequence Diagram
The onboarding module is a rigid, mandatory, 5-phase gatekeeper designed to ensure legal/medical compliance before any clinical patient data can be inputs:

```text
       [ App Startup ]
              │
              ▼
    1. Language Selector ─────────► (ur, en, hi, sw)
              │
              ▼
    2. Medical Consent Screen ────► (Checks database: consent_agreed = true)
              │
              ▼
    3. Hardware Permissions ──────► (Requests OS Camera & Local Storage)
              │
              ▼
    4. Model Manifest Init ───────► (Validates local ONNX checksums)
              │
              ▼
    5. Onboarding Completed ──────► (Saves setting: is_onboarded = true)
```

---

## 2. Interactive Screens Design

### Phase 1: Language Configurator (`onboarding/language.tsx`)
- **UI:** A high-contrast grid of supported languages. Selecting card automatically loads i18next local translations dictionary file (`locales/`).
- **State Store:** `settingsStore.js` is updated with `activeLanguage: 'ur' | 'en' | 'hi' | 'sw'`.

### Phase 2: Double Informed Consent (`onboarding/consent.tsx`)
- **UI:** Vertical scrolling container carrying detailed legal disclosures in chosen language. Disclosures warn that data does not leave device unless synced, and results do not replace dermatologist evaluations.
- **Rules:** The user must manually tick both checkbox controls:
  - `[x] I understand this tool provides triage support, not final medical diagnosis.`
  - `[x] I agree that patient privacy is protected locally.`

### Phase 3: Hardware Permissions Lock (`onboarding/permissions.tsx`)
*   **Camera Permission:** Requisite for image capture. Invokes expo-camera or Android standard request systems.
*   **Storage Access:** Necessary for exports of patient PDF reports.
*   *Fail-soft policy:* If denied, the app displays an alert panel explaining that clinical scans are unavailable without hardware permission.
