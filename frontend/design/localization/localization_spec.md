# MediScan Local - Multilanguage Localization & i18n RTL Specifications

## 1. Supported Clinical Locales
The application supports four localized dialects for rural and local medical deployments:
- **English (`en`):** Default administrative and clinician standard.
- **Urdu (`ur`):** Primary dialect for Pakistan-based CHW integrations. (Requires Right-to-Left RTL alignments).
- **Hindi (`hi`):** Secondary dialect for Northern region operations.
- **Swahili (`sw`):** Primary dialect for East-African region deployments.

---

## 2. Dynamic Right-to-Left (RTL) Engine
*   **Trigger Mechanics:** Switching to `ur` utilizes React Native's `I18nManager.forceRTL(true)`. For web browsers, it appends a global `dir="rtl"` attribute to the document root block.
*   **Visual Shift Rules:**
    *   Flex directions flip automatically (`flex-start` maps to the right margin line).
    *   Chevron arrows representing back navigation switch from Left-facing (`◀`) to Right-facing (`▶`).
    *   Progress bars fill from the right toward the left.

---

## 3. Urdu Font Rendering Guidelines
Urdu characters are notoriously difficult to render on budget screen matrixes due to standard sans-serif system layouts crashing baseline heights.
*   **Font-Family Preference:** Jameel Noori Nastaliq or Noto Nastaliq Urdu.
*   **Font Scaling Buffer:** When rendering Urdu, increase line heights by a minimum multiplier of **1.4x** compared to English equivalents to prevent vertical clipping of text-tails.

```typescript
// Typography Stylesheet Mapping for Multilanguage Renderings
export const getLocalizedTextStyle = (locale: string) => {
  return {
    fontFamily: locale === 'ur' ? 'NotoNastaliqUrdu' : 'Inter',
    lineHeight: locale === 'ur' ? 24 : 18,
    fontSize: locale === 'ur' ? 15 : 14,
    textAlign: locale === 'ur' ? 'right' : 'left'
  };
};
```

---

## 4. Sample Keys Matrix

| Key Reference | English Locale | Urdu Translation | Swahili Translation |
| :--- | :--- | :--- | :--- |
| `welcome_title` | "Universal Decision Engine" | "عالمی طبی فیصلہ ساز انجن" | "Mfumo wa Maamuzi wa Jumla" |
| `consent_notice` | "Local data does not leave device" | "طبی ڈیٹا موبائل سے باہر نہیں جاتا"| "Data haitoki kwenye kifaa" |
| `urgent_title` | "Urgent Referral Required" | "فوری طبی رجوع کی ضرورت ہے" | "Ruksa ya Haraka Inahitajika" |
