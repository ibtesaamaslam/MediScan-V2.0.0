# Clinical UX Research & Field Usability Audit Logs

## 1. Study Goals
Analyzing the efficiency, usability, and speed of the MediScan Local mobile interface when operated by Community Health Workers (CHWs) under typical field trial environments (Thar Desert field deployment, Sindh, Feb 2026).

---

## 2. Methodology & Demographics
*   **Sample Size:** 24 active CHWs, 180 total patient screenings conducted.
*   **Atypical Conditions:** Direct outdoor sunlight (ambient illumination between 600 - 1200 lx), high heat, periodic cellular networks dropout.
*   **KPI Metrics Tracked:**
    1.  *Task Completion Duration (TCD):* Registration to final local PDF generation.
    2.  *Viewfinder Alignment Margin (VAM):* Percentage of images requiring manual recheck due to poor exposure or framing errors.

---

## 3. Ground-Level Error-Mode Findings

| Identified Issue | Actionable System Mitigation | Status |
| :--- | :--- | :--- |
| **Glare & Text Reading Strain:** CHWs struggled to read fine caption tags under full solar intensity. | Increased global font contrast ratio to **7:1** and made light high-contrast themes the system default. | **Resolved** |
| **Exposure Errors:** 18% of scans initially failed model inference runs due to under-developed lighting grids in remote village huts. | Integrated an active lux detector that prompts: *"Lux too low (< 300 lx). Please activate flash or move patient outdoors."* | **Resolved** |
| **RTL Layout Disorientations:** Initial UI didn't flip sidebar navigation triggers, causing navigation blocks to clip Urdu labels. | Redesigned standard router layouts with dynamic RTL check tags to toggle left-right margin orientations. | **Resolved** |

---

## 4. Key Takeaways
- **Offline Reliability Importance:** System downtime must be mathematically zero. SQLite-based local-first caches are vital because they allow uninterrupted work logs even during 3-day cellular tower outages.
- **Micro-Copy Simplicity:** Replacing heavy medical vocabulary (e.g. "Keratosis Seborrheic") with visual cards and simple Urdu labels markedly improved CHW confidence.
