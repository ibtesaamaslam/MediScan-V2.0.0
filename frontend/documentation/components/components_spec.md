# Shared UI Component Specifications

## 1. Directory Structure

Every reusable visual widget in the codebase is categorized into two modular subdivisions (`components/common` and `components/screening`) to speed up maintenance and improve unit-test metrics.

---

## 2. Shared Common Components (`components/common/`)

### A. ScreenContainer (`ScreenContainer.tsx`)
- **Role:** Master wrapper applying baseline grids, background coloring, padding gutters, and safe areas.
- **Props Interface:**
  ```typescript
  interface ScreenContainerProps {
    children: React.ReactNode;
    scrollable?: boolean; // Toggles ScrollView or static View
    safeArea?: boolean;  // Toggles physical screen notches
  }
  ```

### B. OfflineBanner (`OfflineBanner.tsx`)
- **Role:** Displayed prominently when connections degrade.
- **Visuals:** High-contrast amber backplane carrying custom text: `[!] Connection Offline. Storing Clinical Logs Safely on-Device`.

### C. LoadingState (`LoadingState.tsx`)
- **Role:** Indeterminate loading spinners paired with localized status strings during model loading procedures.

---

## 3. Pathology Screening Components (`components/screening/`)

### A. CameraOverlay (`CameraOverlay.tsx`)
- **Role:** Floating overlay drawn over the active viewfinder layer. Includes transparent cropping rectangles, alignment markers, and real-time lux indicators.
- **Props Interface:**
  ```typescript
  interface CameraOverlayProps {
    category: 'skin' | 'eye' | 'oral' | 'wound';
    luxLevel: number; // Alerts if lux falls below 300
    isAligned: boolean; // Changes target card border from red to emerald green
  }
  ```

### B. ConfidenceBar (`ConfidenceBar.tsx`)
- **Role:** Renders calibrated prediction probabilities.
- **Visuals:** Colored progress meters (emerald for high probability, amber for mid, coral red for high severity indicators) accompanied by mono percentage texts.

### C. SeverityChip (`SeverityChip.tsx`)
- **Role:** Standardized, high-contrast labels identifying clinical triage levels: `Healthy`, `Moderate (Monitor)`, or `Abnormal (Urgent Referral)`.
