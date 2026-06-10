# MediScan Local - Design System Token Specification

## 1. Principles
The design system for MediScan Local is built upon three core axioms:
- **Architectural Honesty:** We present clinical state transparently, omitting visual clutter, "AI-hype" styling, or false metrics.
- **Aesthetic Density:** Clinical workflows require high-fidelity layout blocks that make data easily readable for field workers under harsh sunlight.
- **Chromatic Rigor:** Colors represent real medical severity levels. Red, amber, and emerald are strictly isolated for clinical triage flags.

---

## 2. Chromatic Scales (Light Contrast Theme)
The system default is a light-background high-contrast theme, built with slate accents to maximize legibility.

```css
/* Color Tokens */
--color-bg: #f8fafc;           /* Light Slate Background */
--color-surface: #ffffff;      /* Pure White Surface Cards */
--color-surface-muted: #f1f5f9;/* Light Blue-Gray Inlay */
--color-border: #cbd5e1;       /* Contrasting Border */

/* Typography */
--color-text-main: #0f172a;    /* Deep Slate Primary Text */
--color-text-sub: #475569;     /* Slate Secondary Text */
--color-text-muted: #64748b;   /* Muted Gray Secondary Text */

/* Diagnostic Ranges (High Contrast) */
--color-range-low: #059669;    /* Emerald Triage Low Risk */
--color-range-med: #d97706;    /* Amber Triage Medium Risk */
--color-range-high: #dc2626;   /* Crimson Triage High Risk (Urgent Referral) */
```

---

## 3. Spacing Scales (T-Shirt & Multipliers)
All padding, margin, and layout positions are calculated based on the following scalar:

| Code | Value | Application Context |
| :--- | :--- | :--- |
| `spacing-xxs` | `4px` | Tiny gaps, badge alignments |
| `spacing-xs` | `8px` | Small list item gutters, chip padding |
| `spacing-sm` | `12px` | Core inner card padding, subtitle text offsets |
| `spacing-md` | `16px` | Grid column gutters, form field intervals |
| `spacing-lg` | `24px` | Frame side margin, hero component text |
| `spacing-xl` | `32px` | Section margins, outer container margins |
| `spacing-xxl`| `48px` | Onboarding splash offsets, huge displays |

---

## 4. Typography Scale

```typescript
export const typography = {
  sizes: {
    hero: 40,      // Dynamic large displays (welcome titles)
    h1: 24,        // Diagnostic header level 1
    h2: 18,        // Card headers, section headers
    body: 14,      // Main readable clinical text
    caption: 12,   // Subtitles, timeline dates
    mono: 11       // Calibration specs, accuracy percentages
  },
  weights: {
    black: '900',
    bold: '700',
    medium: '500',
    regular: '400'
  },
  families: {
    sans: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace'
  }
};
```

---

## 5. Border Radius & Elevation Radius
*   **Zero Rounded:** `0px` used for strict data lists
*   **Small (Radius SM):** `8px` used for input fields, buttons, and badges
*   **Medium (Radius MD):** `12px` used for standard clinical audit cards and dashboard items
*   **Large (Radius LG):** `16px` used for dialog overlays, modal windows, and camera viewfinder borders
*   **Circular (Radius XL):** `9999px` used for avatar avatars or status indicators
*   **Elevation Shadow:** Focus on light inset strokes instead of deep shadows:
    `border: 1px solid var(--color-border)` paired with a soft `shadow-sm` (`0 1px 2px 0 rgba(0, 0, 0, 0.05)`).
