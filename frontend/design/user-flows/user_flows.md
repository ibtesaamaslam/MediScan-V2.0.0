# MediScan Local - Clinical User-Flow Diagrams & Mappings

## 1. Flowchart Overview: Ground Screening Pipeline
This user flow details the precise steps a Community Health Worker (CHW) takes from offline deployment startup to client referral logging.

```text
       [ Start Screen Tool ]
                 │
                 ▼
       [ Select Native Language ] (EN / UR / HI / SW)
                 │
                 ▼
       [ Informed Consent Panel ] ◄── MUST Agree & Tick Both Disclaimers
                 │
                 ▼
       [ Select Patient Profile ] ──► (Create New Profile if missing)
                 │
                 ▼
       [ Select Medical Category ] (Skin / Eye / Oral / Wound)
                 │
                 ▼
       [ Guided Camera Screen ] ◄── Verify minimum 300 lux lighting
                 │
                 ▼
       [ Local Inference Run ] ───► (Runs entirely in-browser or on-device)
                 │
                 ▼
       [ Local SQLite Database Save ] ──► (Stored locally with AES-256)
                 │
                 ▼
   ┌─────────────┴─────────────┐
   ▼                           ▼
[Confidence > 70%]          [Confidence < 70%]
   │                           │
   ▼                           ▼
[Display Predict Result]    [Display Abstain Flag / Inconclusive Screen]
   │                           │
   └─────────────┬─────────────┘
                 ▼
         [ Generate PDF Report ]
                 │
                 ▼
         [ Log Local Referral ]
```

---

## 2. Dynamic Real-time Sync State Engine
The sync queue operates on a reliable local-first model state to safeguard logs before synchronization servers receive them.

```text
               +--------------------------------------+
               |  SQLite Database: Unsynced Queue      |
               +--------------------------------------+
                                  │
                       [ Check Connectivity ]
                                  │
                ┌─────────────────┴─────────────────┐
                ▼ (No Connection)                   ▼ (Connection OK)
         [ State: Offline ]                  [ State: Handshaking ]
                │                                   │
         [ Hold Logs Safely ]               [ Secure HTTPS POST ]
         [ Display Warning ]                        │
                │                        ┌──────────┴──────────┐
                │                        ▼ (Fail)              ▼ (Success)
                │                [ Retry Backoff ]     [ Update Sync Roster ]
                │                        │                     │
                └────────────────────────┴──────────┬──────────┘
                                                    ▼
                                            [ Audit Clean Loop ]
```
- **Error Backoff Protocol:** Exponentials: 1s, 2s, 4s, 8s, up to 60s backup.
- **Local Isolation Security:** When syncing records, patient names are replaced with a cryptographic hash, while retaining clinical vectors to ensure HIPAA Compliance.
