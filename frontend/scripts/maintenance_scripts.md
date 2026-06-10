# Operational Scripts & Maintenance Manual

## 1. Overview
The `frontend/scripts` workspace contains utility definitions for automated system maintenance, automated backups, database migrations, and telemetry checks.

---

## 2. Model Integrity Checksum Validation (`verify_models.ts`)
This script executes pre-build verification on the INT8 quantized ONNX models to confirm their SHA-256 signature match the dynamic manifest entries before packaging:

```typescript
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';

export function calculateChecksum(filePath: string): string {
  const binary = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(binary).digest('hex');
}

// Compares models with manifest entries
const manifestPath = path.resolve(__dirname, '../models/model_manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const modelPath = path.resolve(__dirname, '../models/skin/skin_v1.onnx');
if (fs.existsSync(modelPath)) {
  const calc = calculateChecksum(modelPath);
  if (calc !== manifest.models.skin.checksum) {
    console.error("❌ Model verification failure! Checksum mismatch.");
    process.exit(1);
  }
  console.log("✔ Model signature verified successfully!");
}
```

---

## 3. Database Maintenance Routine (`clean_database.ts`)
Executes optimization routines on the local SQLite client files across developer workspaces:
*   Triggers standard SQL `VACUUM` commands to compress space.
*   Triggers `REINDEX` on all indexed keys across primary patient tables.
*   Archiving synced records older than 180 days to stay light.

---

## 4. Bulk Localization Translator (`sync_locales.ts`)
Automating localization scans across key file types, generating JSON translation templates for Urdu, Hindi, and Swahili translators automatically.
