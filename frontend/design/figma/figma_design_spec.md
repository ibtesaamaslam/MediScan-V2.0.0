# Figma Design-to-Code Mapping Specification

## 1. Overview
This specification bridges the visual hierarchy defined in the Figma library with the React Native structure configured in MediScan Local. Every component, frame, and constraint is calculated for local, offline execution under high-urgency clinical environments.

---

## 2. Global Canvas Style
*   **Color Profile:** Display P3 Wide Color (fallback to sRGB)
*   **Base Resolution:** 390 x 844 px (iPhone 14 / Standard Android)
*   **Grid System:**
    *   **Type:** 4-Column Fluid Grid
    *   **Margin:** 24 px
    *   **Gutter:** 16 px
    *   **Grid Align:** Center
*   **Spacing Unit:** 4px baseline grid (all paddings/margins must align to multipliers of 4: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 48px).

---

## 3. Visual Tokens Configuration

### A. Color Brand Tokens (Figma Variables)
| Figma Variable Name | Hex Code | Purpose / Light Theme Application |
| :--- | :--- | :--- |
| `color-primary` | `#0f172a` | Deep Slate / Backgrounds & High-contrast Text |
| `color-accent` | `#0284c7` | Sky Blue / Active Tabs, Focus states, Highlights |
| `color-success` | `#10b981` | Emerald Green / Healthy Diagnostic Ranges (Low Risk) |
| `color-warning` | `#f59e0b` | Amber Yellow / Medium Severity (Warning/Observe) |
| `color-error` | `#ef4444` | Coral Red / High Severity (Urgent Referral Required) |
| `color-surface` | `#1e293b` | Dark Slate Card / Screen component wrappers |
| `color-border` | `#334155` | Border lines & Dividers |
| `color-text-primary`| `#ffffff` | Primary readable text |
| `color-text-secondary`|`#94a3b8` | Supporting text, descriptions, details |
| `color-text-muted` | `#64748b` | Disabled labels, timeline stamps |

---

## 4. Primary Screen Layouts

### F_ONB_01: Welcome Canvas
- **Visuals:** Huge displaying typography paired with modern spacing. Large graphic container representing neural mapping of screening nodes.
- **Interactions:** Tap "Begin Onboarding" transitions into language selector page.

### F_ONB_02: Consent Panel
- **Visuals:** Vertical Scrolling Frame with generous layout heights. Complete privacy legal disclosures with explicit checklists.
- **Interactions:** Both checkmarks must be active before "Confirm & Agree" unlocks.

### F_DSH_01: Medical Dashboard
- **Visuals:** Persistent top header detailing connections (online/offline) and offline stats cards. Underneath resides a grid of 4 diagnostic categories:
  - Skin Screening (`🧴`)
  - Eye Screening (`👁️`)
  - Oral Diagnostics (`🦷`)
  - Wound Diagnostics (`🩹`)
- **Interactions:** Grid tiles register hover/press changes; tapping opens corresponding capture scanner.

---

## 5. Prototype Links & Transitions
*   **Transition Presets:** Smart Animate (`motion` equivalents)
    *   **Inter-screen slide:** Slide Left (300ms, Cubic Bezier 0.4, 0, 0.2, 1)
    *   **Camera capture flash:** Instant
    *   **Loader processing loop:** Infinite rotation (ease-in-out)
*   **Figma File URL Reference:** `figma.com/file/mediscan-universal-decision-engine`
