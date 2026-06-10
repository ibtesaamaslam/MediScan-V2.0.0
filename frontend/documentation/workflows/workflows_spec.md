# Clinical Workflow Document - Sequence Specifications

## 1. Ground Clinic Session Workflow (Offline First)
The core workflow designed for rural and field community health campaigns consists of five discrete phases to ensure error-free client profiles:

```text
  [ CHW Arrives in District ]
              │
              ▼
   +───────────────────────+
   |  1. Start Session     |  ◄── Logs general location data
   +───────────────────────+
              │
              ▼
   +───────────────────────+
   |  2. Register Patient  |  ◄── Enters name, age, and assigned gender
   +───────────────────────+
              │
              ▼
   +───────────────────────+
   |  3. Guided Capture    |  ◄── Alignment checks and auto-flash toggles
   +───────────────────────+
              │
              ▼
   +───────────────────────+
   |  4. On-Device Run     |  ◄── Local ONNX model execution
   +───────────────────────+
              │
              ▼
   +───────────────────────+
   |  5. Audit Log Save    |  ◄── Encrypts session and logs locally
   +───────────────────────+
```

---

## 2. Technical Step Verifications

### Step 1: Client Medical Onboarding
*   The CHW enters client identifiers. If offline, the profile is given an incremental index key (e.g. `OFF-9281`) with `synced: false`.
*   SQLite writes this client profile to index table `patients_table`.

### Step 2: Viewfinder Diagnostics Auto-check
*   The system opens the camera driver. 
*   An illumination checker checks input matrix frames continuously. If illumination values fall below 300 lux, a warning highlights: `Caution: Low Illumination. Please request patient move to outdoor light.`
*   Once focus matches visual requirements, the image tensor gets locked at standard capture resolution.

### Step 3: Local Neural Compute Task (ONNX)
*   The image path converts to standard normalized tensor vectors (`[1, 3, 224, 224]`) on-device.
*   The raw logits are updated using the local Platt calibration matrices stored inside `models/calibration`.
*   If prediction estimates exceed 70.0%, result cards display the primary hypotheses logic. If not, the Inconclusive card triggers.

### Step 4: Encrypted Local Archival
*   On-device databases save this results report. Every entry is marked with `synced = 0`.
*   A localized PDF report is generated containing the diagnostic disclaimers, timestamps, and model ID specifications. It is exported via local sharing wrappers (e.g. bluetooth or WhatsApp) immediately.
