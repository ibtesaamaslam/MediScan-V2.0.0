# Structural Architecture Specifications - MediScan Local

## 1. Primary Technology Stack
MediScan Local utilizes a lightweight, power-efficient, cross-platform architecture to enable robust clinical evaluations on standard Android and iOS devices.

*   **Runtime Framework:** React Native with Expo (SDK 50+) and TypeScript.
*   **Routing System:** Expo Router (File-based navigation with tab isolation and screen-stack overlays).
*   **Database Management:** SQLite with SQLCipher encryption wrappers, ensuring off-grid data integrity.
*   **State Management:** Zustand (Micro-stores for application, settings, scanning queues, patients catalogs).
*   **Artificial Intelligence Runtime:** ONNX Runtime Web/Mobile (`onnxruntime-react-native`). Executes INT8 quantized network matrices entirely on-device.
*   **Translation Engine:** `i18next` with `react-i18next`.

---

## 2. Directory Layout Rationale
The application partition layout mirrors a pure separation of concerns philosophy:

```text
frontend/
├── app/                 # Expo Router file directories specifying screen routes
├── components/          # Architectural view components (Common, Screening specific)
├── services/            # Logic layers: database, model runtimes, exports, security
├── store/               # Zustands stores orchestrating system states
├── types/               # Type-safe type dictionaries
├── locales/             # i18n JSON files carrying translations
└── theme/               # Central styles, color systems, and spacing definitions
```

---

## 3. Zustand Global State Partitioning
To avoid single-store performance bottlenecks, state is divided into compartmentalized slices:
- **`appStore`:** Orchestrates high-level system states: language updates, online status, onboarding milestones.
- **`patientStore`:** Manages registered patient profiles and session-queue additions.
- **`screeningStore`:** Track active camera logs, confidence margins, and result layouts.
- **`syncStore`:** Tracks queue transferring queues, retry logs, and sync percentages when re-establishing cloud server linkups.

---

## 4. On-Device Model Execution Pipeline
```text
  [ Image Capture URI ]
            │
            ▼
 [ Image Preprocess Node ]  ◄── Resize to 224x224, Convert RGB channels, Normalize
            │
            ▼
    [ Float32 Tensor ]
            │
            ▼
   [ ONNX Runtime CPU ]     ◄── Executes model on-device (Zero network requests)
            │
            ▼
    [ Raw Logit Output ]
            │
            ▼
   [ Platt Calibration]     ◄── Maps raw calculations to realistic probability ranges
            │
            ▼
    [ Well-Calibrated PDF ]
```
This architecture executes entirely on-device, prioritizing speed, offline reliability, and data privacy.
