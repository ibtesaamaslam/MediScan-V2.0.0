# MediScan Local - Wireframe Blueprints & Layout Specifications

## 1. Architectural Layout Blueprint

### W_ONB_01: Welcome & Landing Canvas
```text
+-------------------------------------------------------+
|  [HBL] 18:13                                          |
+-------------------------------------------------------+
|                                                       |
|                     [ ICON: Logo ]                    |
|                                                       |
|                       MEDISCAN                        |
|               UNIVERSAL DECISION ENGINE               |
|                                                       |
|              +-------------------------+              |
|              |    Begin Onboarding     |              |
|              +-------------------------+              |
|                                                       |
|              [i] Secure Offline Vault                 |
+-------------------------------------------------------+
```
- **Constraint Layout:** Logo and main greeting centered vertically in the frame.
- **Button Target:** 52px height, 100% width with 24px margins. Fully touchable.
- **Support Footer:** Centered metadata informing the user that zero cloud metrics are dispatched during this session.

---

### W_DSH_01: Main Clinical Dashboard
```text
+-------------------------------------------------------+
|  [ Welcome Back, Fatima ]              [ (O) ONLINE ] |
|  CHW Terminal Console                                 |
+-------------------------------------------------------+
|  QUICK DIAGNOSTIC SCREENING                           |
|  +--------------------+   +--------------------+      |
|  |  🧴 Skin Screening |   |  👁️ Eye Diagnostics |      |
|  +--------------------+   +--------------------+      |
|  |  🦷 Oral Triage    |   |  🩹 Wound Audit    |      |
|  +--------------------+   +--------------------+      |
+-------------------------------------------------------+
|  AUDIT HISTORY ROSTER                   [ View All ]  |
|  +--------------------------------------------------+ |
|  | Primary Keratosis | Skin | Conf: 91% | Feb 18    | |
|  +--------------------------------------------------+ |
|  | Healthy Conjunctiva| Eye | Conf: 96% | Feb 17    | |
|  +--------------------------------------------------+ |
+-------------------------------------------------------+
|  [ CHW PATIENT MANAGEMENT PORTAL ]                    |
+-------------------------------------------------------+
```
- **Status Indicator:** Placed top-right inside a clear, border-framed badge.
- **Interactive Grid:** Two-column grid with a gutter size of 12px.
- **History List:** Compact table-like elements with clean, right-aligned confidence ratios.

---

### W_CAP_01: Guided Medical Camera
```text
+-------------------------------------------------------+
|  [ < Back ]       [ Guided Camera Frame ]     [ (X) ] |
+-------------------------------------------------------+
|                                                       |
|   + - - - - - - - - - - - - - - - - - - - - - - - +   |
|   |                                               |   |
|   |         [ OVERLAY: ALIGNMENT RING ]          |   |
|   |             "Position Skin 10cm"              |   |
|   |                                               |   |
|   + - - - - - - - - - - - - - - - - - - - - - - - +   |
|                                                       |
|                 [ Ambient Lux: 820 lx ]               |
|                                                       |
|                  +-----------------+                  |
|                  |   ( ) CAPTURE   |                  |
|                  +-----------------+                  |
+-------------------------------------------------------+
```
- **Viewfinder Scope:** A strict 1:1 Aspect Ratio centering-mask to maximize tensor crop accuracy.
- **Guidance Ring:** Changes color from red to emerald green when focus indicators and lighting thresholds (minimum 300 lux) are achieved.
- **Trigger Button:** Oversized 72px diameter circular floating element placed at base center.
