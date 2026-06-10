# Local-First Database & Offline Sync Architecture

## 1. Database Specifications (SQLite Service)
All data persistence in MediScan Local is handled by an on-device SQLite service to ensure zero-downtime operations when cellular connectivity is completely absent.

---

## 2. Table Schema Definitions

### Patients Roster (`patients_table`)
| Column Name | Type | Key Type | Purpose |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(36)` | PRIMARY KEY | Unique UUID or Local ID |
| `fullName` | `TEXT` | NOT NULL | Patient complete name |
| `age` | `INTEGER` | NOT NULL | Patient assigned age |
| `gender` | `VARCHAR(1)` | NOT NULL | M / F / O |
| `registeredAt`| `TIMESTAMP` | NOT NULL | Date registered |
| `offlineCreated`|`BOOLEAN` | DEFAULT 1 | Tracks if created off-grid |
| `synced` | `BOOLEAN` | DEFAULT 0 | Sync checker flag |

### Diagnostic Screenings (`screenings_table`)
| Column Name | Type | Key Type | Purpose |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(36)` | PRIMARY KEY | Log registration UUID |
| `moduleType` | `VARCHAR(12)` | NOT NULL | skin / eye / oral / wound |
| `conditionName`|`TEXT` | NOT NULL | Primary hypothesis prediction result |
| `confidence` | `REAL` | NOT NULL | Calibrated probability margin |
| `severity` | `VARCHAR(12)`| NOT NULL | benign / moderate / urgent |
| `recommendation`|`TEXT` | NOT NULL | Clinical instruction copy |
| `differentials`|`TEXT` | NOT NULL | JSON string representation of differentials |
| `timestamp` | `TIMESTAMP` | NOT NULL | Execution log date |
| `imageUri` | `TEXT` | NOT NULL | File path link to local photo asset |
| `offlineSaved` | `BOOLEAN` | DEFAULT 1 | Storage check |
| `synced` | `BOOLEAN` | DEFAULT 0 | Transfer status flag |
| `abstainFlag` | `BOOLEAN` | DEFAULT 0 | Set if confidence falls below 70% |

---

## 3. SQLite Encrypted Data Safe-zones
*   **Key Storage:** On application start, the `SecureStoreService` generates, stores, and looks up a 256-bit AES cryptographic key using iOS Keychain and Android Keystore safe vaults.
*   **Database Lock:** All database writes are processed through a SQLite encrypted layer using the generated cryptographic key. This protects patient diagnostic logs from memory attacks if the Android hardware is lost or stolen.

---

## 4. Sync State Management (Reliable Sync Loop)
*   **Connectivity Tracking:** App stores track global status indicators via network event listeners.
*   **Sequential Transfer:** When connections re-establish, the sync manager fetches all records where `synced = 0`.
*   **Decoupled Payload:**
    - To preserve HIPAA standards, patient names are replaced with a cryptographic hash (SHA-256) when uploading records to external servers, protecting patient identities.
    - If transfer confirms with `Status 200`, SQL commands trigger: `UPDATE screenings_table SET synced = 1 WHERE id = ?`.
