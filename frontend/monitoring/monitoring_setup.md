# On-Device Runtime Performance & Health Monitoring Setup

## 1. Monitoring Performance Budgets
To prevent application crashes or battery drain on budget smartphones, we establish strict runtime performance budgets:

| Metric Indicator | Performance Budget Guard | Status Action |
| :--- | :--- | :--- |
| **ONNX Engine Startup Latency** | `< 1200 ms` | Warn if load exceeds 2 seconds |
| **Inference Compute Thread Latency** | `< 500 ms` | Trigger benchmark diagnostic |
| **Background Synchronization Thread** | `< 80 ms` | Run at low thread priority |
| **Memory Allocation Floor (Heap)** | `< 120 MB RAM` | Run garbage collection loops |
| **Physical CPU Target Temperatures** | `< 45° C (113° F)`| Lower frame rates of viewfinder |

---

## 2. Dynamic Memory Leak Prevention
Zustand stores are cleaned periodically. If list sizes exceed 200 items, the local SQLite database removes oldest records from active memory, keeping storage footprint light:

```typescript
// Memory allocation guard inside ModelLoader.ts
export function checkHeapAllocation() {
  if (global.gc) {
    global.gc(); // Explicitly request garbage collection if run under V8 developer deck
  }
}
```

---

## 3. Thermal and Battery Health Adjustments
Budget devices operating under direct sunlight can overheat rapidly, leading to CPU throttling and dropped frames in the viewfinder.
- **Dynamic Framerate Scaling:** If device temperature indicators exceed $42^\circ\text{C}$, the viewfinder framerate drops from 30 FPS to 15 FPS to ease processing loads.
- **Auto-Turnoff flash:** Guided camera flash cycles are capped at 10 seconds per session to preserve phone battery.
- **System Diagnostics Panel:** Accessible directly inside the Developer options deck (`/developer/diagnostics`).
