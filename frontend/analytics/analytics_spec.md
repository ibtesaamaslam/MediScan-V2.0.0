# Anonymized Clinical Telemetry & Flow Performance Analytics

## 1. Compliance Mandate: Zero Personal Identifiable Information (PII)
MediScan Local operates on strict compliance guidelines. Under zero circumstances are Patient Names, Medical IDs, Images, or raw location coordinates compiled into telemetry logs.

*   **Identities Masking:** Patient IDs are replaced with SHA-256 hashes inside session payloads.
*   **On-Demand Configuration:** Telemetry collection can be completely disabled in the Privacy settings panel (`/settings/privacy`).

---

## 2. Tracked Telemetry Metrics

### A. Process Task Completion Times (TCD)
Tracks the speed at which a Community Health Worker (CHW) can navigate and execute a complete patient screening:
- `time_onboarding_seconds`: Time spent during Welcome, Language selection, and Consent checks.
- `time_capture_to_inference_ms`: Latency of standard ONNX model runtimes on-device.

### B. Viewfinder Flow Success Rates
Tracks user-error margins during guided image capture:
- `event_camera_alignment_fail`: Retapped capture attempts due to poor lighting (lux < 300) or misaligned camera frames.
- `event_inference_abstain`: Count of inconclusive results (where confidence level fell below 70%).

### C. Queue Sync Statistics
Tracks performance when restoring network linkups:
- `sync_retry_count`: The count of failed attempts before a packet uploads successfully.
- `sync_payload_size_bytes`: Data size per transfer packet.
