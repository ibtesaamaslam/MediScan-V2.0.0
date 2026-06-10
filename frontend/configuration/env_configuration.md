# Build Environment & Model Manifest Configurations

## 1. Supported Build Profiles
The application utilizes three system profiles to manage local and cloud settings:
- **`development`**: Enables dev loaders, model benchmarks, and detailed diagnostic logs in console.
- **`staging`**: Configures test synchronization endpoints.
- **`production`**: Strict medical compliance active. Complete anonymization, high contrast styling, and secure key encryption active.

---

## 2. Environment Variables Specification (`.env.example`)
To configure the full-stack system, declare these core environment values before starting the build:

```bash
# General Settings
EXPO_PUBLIC_APP_ENV=production
EXPO_PUBLIC_API_URL=https://ais-pre-t6l6zyhmqtcswknlhmrbel-267665638329.asia-southeast1.run.app

# Database Encryption Salt (MUST be long secure string)
LOCAL_SQLITE_ENCRYPTION_KEY_SALT=f3b2cbcf31222b0a9cdcb08c73c8a9238c37d40cb9b6de7b80a56bdcf5903b2

# Remote Model Checksum Servers
DASHBOARD_ANALYTICS_KEY=anonymized_telemetry_key
```

---

## 3. Local Model Manifest Index (`model_manifest.json`)
The manifest manages ONNX file verification before execution, safeguarding against file corruption.

```json
{
  "manifest_version": "2.0.0",
  "stage": "production",
  "models": {
    "skin": {
      "version": "1.2.0",
      "size_bytes": 7759462,
      "checksum": "8f3b2cbcf31222b0a9cdcb08c73c8a9238c37d40cb9b6de7b80a56bdcf5903b2"
    },
    "eye": {
      "version": "1.1.0",
      "size_bytes": 5452595,
      "checksum": "c92850cd7c40e5a89f3cb2cbcf31222b0a9cdcb08c73c8a9238c37d40cb9b6de"
    }
  }
}
```
If Model status checks fail during the onboarding stage, the app prompts the CHW: *"Warning: Model file corrupted. Re-downloading from local sync point."*
