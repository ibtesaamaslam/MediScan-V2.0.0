# MediScan Local - WCAG 2.1 AAA & HIPAA Accessibility Compliance Specifications

## 1. Core Objectives
Every screen interface designed for MediScan Local must be fully functional, safe, and accessible to clinical personnel with varying degrees of vision impairment, auditory limitations, or motor skills.

---

## 2. Chromatic and Contrast Constraints
To counter direct outdoor sunlight glare, the following parameters are strictly enforced:

*   **Primary Text Contrast:** Maintain a minimum contrast ratio of **7:1** for all body text (`#ffffff` or `#0f172a` against corresponding background layers).
*   **Atypical Elements:** Minor captions or indicators must exceed a contrast ratio of **4.5:1** against parent components.
*   **Non-Reliance on Hue:** Colors representing medical classification flags (emerald for low-risk, red for severe) must be paired with explicit text labeling or icons:
    *   *Incorrect:* Red dot alone.
    *   *Correct:* `[!] Coral Warning: Urgent Recommendation Required` paired with matching icon structures.

---

## 3. Keyboard & Screen Reader Mapping
*   **Touch Targets:** All interactive components (buttons, checklist blocks, back buttons) must occupy a minimum dimension of **48 x 48 px** (equivalent to 48dp on Android and 48pt on iOS) with clean buffers to prevent accidental triggers.
*   **Semantic Elements:** Map standard HTML identifiers and React Native `accessibilityRole` / `accessibilityLabel` bindings on every interactive element:
    *   *Back Button:* Set `accessibilityRole="button"` and `accessibilityLabel="Return to main dashboard terminal"`.
    *   *Result Card:* Set `accessibilityLiveRegion="assertive"` so that speech synthesis engines immediately announce newly arrived prediction results.
*   **Flipped RTL Layouts (Urdu):** Ensure reading tab orders correctly flip from right-to-left when उर्दू locale is active.
*   **Form Inputs:** Explicitly tie `<TextInput>` placeholders to labels using native focus and accessibility bindings.
