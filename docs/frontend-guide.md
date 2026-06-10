# MediScan Local Frontend Guide

## 1. Product Goal

MediScan Local is an offline-first medical screening frontend for field use in rural and low-connectivity settings. The frontend must let a health worker or user:
- open the app quickly
- understand what the app does
- capture an image
- review it
- run screening
- see a result
- save it locally
- revisit history later
- use the app in multiple languages
- switch into batch screening mode for community health workers

The frontend must feel like a working product.

---

## 2. Core Principles

- Offline first
- Fast and simple workflows
- Clear medical language
- Low friction
- Large touch targets
- Strong accessibility
- Real screen transitions
- Local persistence
- No fake dashboard-only app behavior

---

## 3. App Flow

### First launch flow
1. Splash
2. Welcome
3. Consent
4. Language selection
5. Permissions
6. Home dashboard

### Screening flow
1. Home
2. Choose skin or eye screening
3. Camera capture
4. Image review
5. Processing
6. Result screen
7. Save to history
8. Option to export report or start another screening

### CHW flow
1. Home
2. CHW mode
3. Add patient
4. Capture screening
5. Save result
6. Repeat for next patient
7. End batch session
8. View session summary
9. Export summary

### History flow
1. Open history
2. Browse previous screenings
3. Tap a record
4. View details
5. Export/share report

### Settings flow
1. Change language
2. Toggle privacy options
3. View storage usage
4. Delete data
5. See app version and device info

---

## 4. Screen List and Responsibilities

### Splash / Loading Screen
Purpose:
- show app identity
- initialize database
- load translations
- check stored consent state
- check model manifest

Must display:
- app logo
- loading indicator
- short tagline

### Welcome Screen
Purpose:
- explain what the app does
- guide user into onboarding

Must display:
- app title
- short explanation
- primary CTA
- secondary learn more CTA

### Consent Screen
Purpose:
- explain privacy and screening limitations
- collect informed consent

Must display:
- privacy summary
- local-only storage explanation
- screening disclaimer
- consent checkbox or accept button

### Language Screen
Purpose:
- choose language

Languages:
- English
- Urdu
- Hindi
- Swahili

Must support:
- RTL layout when Urdu is selected
- persistent saved language preference

### Permissions Screen
Purpose:
- request camera permission
- request storage permission if needed

Must display:
- why permissions are needed
- continue button

### Home Dashboard
Purpose:
- main entry point
- show screening modules
- show history shortcut
- show CHW mode shortcut
- show offline status

Must display:
- greeting
- cards for skin and eye screening
- history card
- CHW mode card
- settings icon

### Skin Screening Screen
Purpose:
- start skin screening workflow

Must display:
- screening instructions
- capture button
- body-area guidance
- sample capture hints

### Eye Screening Screen
Purpose:
- start eye screening workflow

Must display:
- capture guidance
- close-up instructions
- stability warning
- start capture button

### Camera Capture Screen
Purpose:
- open camera
- take image
- retake if needed

Must display:
- live camera preview
- guide overlay
- capture button
- flash toggle if supported
- back button

### Image Review Screen
Purpose:
- confirm image before inference

Must display:
- captured image preview
- retake button
- confirm button
- note if image is blurry or too dark

### Processing Screen
Purpose:
- run model inference
- show progress and model loading

Must display:
- spinner or progress animation
- model name
- processing message
- estimated result flow

### Results Screen
Purpose:
- present screening outcome clearly

Must display:
- primary condition label
- confidence score
- severity indicator
- action recommendation
- differentials
- warning if confidence is low
- save button
- export button
- new screening button

### History Screen
Purpose:
- show previous screenings

Must display:
- list of previous results
- date and time
- module type
- condition
- confidence
- status chip

### Screening Details Screen
Purpose:
- show full saved result

Must display:
- image thumbnail if stored locally
- metadata
- result breakdown
- action guidance
- export option

### CHW Dashboard
Purpose:
- manage field batch sessions

Must display:
- active session state
- patient queue
- quick add patient
- batch capture entry
- session summary

### Batch Session Screen
Purpose:
- manage multiple patients

Must display:
- patient list
- screening progress
- completed screenings count
- referral counts
- end session button

### Referral / Action Screen
Purpose:
- show what to do next

Must display:
- monitor
- refer to clinic
- urgent referral
- simple explanation of urgency

### Settings Screen
Purpose:
- configure the app

Must display:
- language
- privacy controls
- offline data controls
- app version
- device info

### Privacy / Data Management Screen
Purpose:
- control local data

Must display:
- export local data
- delete local data
- sync settings if enabled later
- consent history

### Export / Report Screen
Purpose:
- generate summary output

Must display:
- screening report preview
- export PDF/share button
- print-friendly summary

---

## 5. Navigation Structure

Recommended route structure:

```bash
app/
├── _layout.tsx
├── index.tsx
├── splash.tsx
├── onboarding/
│   ├── welcome.tsx
│   ├── consent.tsx
│   ├── language.tsx
│   └── permissions.tsx
├── screening/
│   ├── skin.tsx
│   ├── eye.tsx
│   ├── capture.tsx
│   ├── review.tsx
│   ├── processing.tsx
│   └── result.tsx
├── history/
│   ├── index.tsx
│   └── [id].tsx
├── chw/
│   ├── index.tsx
│   ├── session.tsx
│   └── add-patient.tsx
├── reports/
│   ├── index.tsx
│   └── [id].tsx
└── settings/
    ├── index.tsx
    ├── privacy.tsx
    └── about.tsx
```

---

## 6. State Management

Use a store for:

* onboarding completion
* consent state
* language selection
* current screening module
* captured image URI
* inference result
* history records
* CHW session data
* offline status

Suggested stores:

* `appStore`
* `screeningStore`
* `historyStore`
* `chwStore`
* `settingsStore`

---

## 7. Local Storage

Use SQLite for:

* saved screenings
* patient/session data
* consent records
* settings cache

* id
* created_at
* module_type
* condition_name
* confidence
* recommendation
* severity
* image_path
* patient_id if CHW mode is used
* session_id if batch mode is used

---

## 8. Data Contract for Inference Results

Every result object should follow a consistent schema:

```ts
{
  id: string;
  module: 'skin' | 'eye';
  label: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'urgent';
  recommendation: string;
  differentials: string[];
  savedAt: string;
  imageUri?: string;
}
```

The frontend must not claim diagnosis. It should always say screening, triage, or referral recommendation.

---

## 9. Design System

### Colors

* Background: dark navy / near-black
* Surface: card-based charcoal or slate
* Primary: blue
* Success: green
* Warning: amber
* Danger: red
* Text: white / slate shades

### Typography

* Large title
* Strong section headers
* Clear body text
* High contrast
* Readable on small devices

### Components

* Button
* Card
* Badge
* Banner
* Confidence bar
* Result summary card
* Warning card
* Empty state card
* Loading state
* Offline banner

---

## 10. Multilingual Support

Must support:

* English
* Urdu
* Hindi
* Swahili

Urdu must use RTL layout.

Translation files should include:

* onboarding
* navigation
* screening instructions
* result messages
* settings labels
* privacy text

---

## 11. Offline Behavior

The frontend should work fully offline for core screening.

When offline:

* camera capture still works
* inference still works locally or uses local mock service during development
* history still works
* settings still works
* reports still work locally

The app should show an offline banner when relevant.

---

## 12. Dataset Guidance

If model training data is needed later, use public datasets from Kaggle or Hugging Face.

Suggested dataset strategy:

* Skin conditions: public dermatology datasets from Hugging Face or Kaggle
* Eye conditions: public ophthalmology datasets from Hugging Face or Kaggle
* Do not use private or unverified data
* Keep dataset manifests and class labels in a JSON file
* Version datasets with DVC or similar

The frontend should not directly train models, but it must be built to receive outputs from a real ML inference service.

---

## 13. Working App Expectations

The generated frontend should actually behave like this:

* buttons navigate correctly
* images can be captured and reviewed
* results can be shown and saved
* history can be browsed
* language changes work live
* CHW mode works as a distinct workflow
* settings apply instantly
* screens feel connected and not isolated

---

## 14. Files That Must Be Created

At minimum create:

* `app/` routes
* `components/`
* `hooks/`
* `store/`
* `lib/`
* `locales/`
* `assets/`
* `models/`
* `types/`
* `theme/`
* `docs/frontend-guide.md`
* `README.md`

---

## 15. Final Instruction to the Generator

Generate the frontend as a real app with complete screen behavior, not a concept demo. Every screen should have a role in the product flow. The UI should feel like a genuine healthcare application that a community worker or patient could actually use.
