<div align="center">

# 🏥 MediScan V2.0.0

### Offline-First AI Medical Screening for Resource-Limited Settings

[![Backend CI](https://github.com/ibtesaamaslam/MediScan-V2.0.0/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/ibtesaamaslam/MediScan-V2.0.0/actions/workflows/backend-ci.yml)
[![Mobile CI](https://github.com/ibtesaamaslam/MediScan-V2.0.0/actions/workflows/mobile-ci.yml/badge.svg)](https://github.com/ibtesaamaslam/MediScan-V2.0.0/actions/workflows/mobile-ci.yml)
[![ML Validate](https://github.com/ibtesaamaslam/MediScan-V2.0.0/actions/workflows/ml-validate.yml/badge.svg)](https://github.com/ibtesaamaslam/MediScan-V2.0.0/actions/workflows/ml-validate.yml)
[![Security Scan](https://github.com/ibtesaamaslam/MediScan-V2.0.0/actions/workflows/security-scan.yml/badge.svg)](https://github.com/ibtesaamaslam/MediScan-V2.0.0/actions/workflows/security-scan.yml)
[![License](https://img.shields.io/github/license/ibtesaamaslam/MediScan-V2.0.0)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-89.5%25-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-8.1%25-3776AB?logo=python)](https://www.python.org/)
[![HIPAA Compliant](https://img.shields.io/badge/HIPAA-Compliant-green)](./docs/privacy-policy.md)
[![GDPR](https://img.shields.io/badge/GDPR-Compliant-blue)](./docs/privacy-policy.md)

**Bringing AI-powered medical screening to clinics, field workers, and remote communities — with or without internet.**

[📖 Documentation](./docs/) · [🐛 Report Bug](./.github/ISSUE_TEMPLATE/bug_report.md) · [✨ Request Feature](./.github/ISSUE_TEMPLATE/feature_request.md) · [🤝 Contribute](./CONTRIBUTING.md)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [What's New in V2.0.0](#-whats-new-in-v200)
- [Key Features](#-key-features)
- [Supported Screenings](#-supported-screenings)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Environment Setup](#-environment-setup)
- [Running the App](#-running-the-app)
- [ML Model Pipeline](#-ml-model-pipeline)
- [Community Health Worker (CHW) Mode](#-community-health-worker-chw-mode)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Security & Privacy](#-security--privacy)
- [Multi-Language Support](#-multi-language-support)
- [Benchmarking](#-benchmarking)
- [CI/CD Pipelines](#-cicd-pipelines)
- [Contributing](#-contributing)
- [Clinical Disclaimer](#-clinical-disclaimer)
- [License](#-license)

---

## 🌍 Overview

MediScan is an **offline-first, AI-powered clinical screening platform** designed for deployment in resource-limited environments — rural clinics, field hospitals, and community health programs where internet connectivity is unreliable or nonexistent.

Using on-device ONNX inference models, MediScan allows Community Health Workers (CHWs) and clinicians to:

- Capture images via mobile camera
- Run AI-powered analysis entirely on-device (no cloud required)
- Receive differential diagnoses with confidence scores
- Generate clinical reports and referral documents
- Sync data with a central server when connectivity is available

MediScan V2.0.0 is a complete monorepo refactor built on Expo Router, FastAPI, and PyTorch-exported ONNX models — designed with HIPAA, GDPR, and WHO Digital Health Guidelines compliance at its core.

> **⚕️ Clinical Disclaimer:** MediScan is a decision-support tool, not a replacement for licensed medical professionals. All results must be reviewed and confirmed by qualified clinical staff before treatment decisions are made.

---

## 🆕 What's New in V2.0.0

- **Full monorepo refactor** using Turborepo and pnpm workspaces
- **Expo Router** replacing React Navigation for file-based routing
- **ONNX Runtime** on-device inference replacing cloud-based calls
- **Wound screening module** added alongside skin, eye, and oral
- **CHW batch session mode** for processing multiple patients in sequence
- **Multi-language RTL support** — Urdu, Arabic-script languages fully supported
- **Fairness evaluation pipeline** with subgroup analysis across skin tone, age, and gender
- **Model calibration pipeline** with temperature scaling
- **Kubernetes + Terraform** infrastructure for cloud sync backend
- **Prometheus + Grafana** monitoring for backend and model telemetry
- **Biometric authentication** (Face ID / Fingerprint) added alongside PIN

---

## ✨ Key Features

### 📱 Mobile Application

| Feature | Description |
|---|---|
| **Offline-First** | 100% functionality without internet. On-device SQLite + ONNX inference |
| **On-Device AI** | ONNX models run locally — no image data leaves the device during screening |
| **Biometric Auth** | Face ID / Fingerprint + PIN fallback for secure access |
| **Camera Guidance** | Real-time focus guides, exposure guides, and positioning overlays |
| **Confidence Scoring** | Each result includes a calibrated confidence bar and severity badge |
| **Differential Diagnosis** | Top-3 differential conditions ranked by probability |
| **Abstention Logic** | Model declines to diagnose when confidence is below clinical threshold |
| **PDF Reports** | Auto-generated clinical reports for referrals and records |
| **Offline Sync** | Queued sync manager uploads to backend when connectivity returns |
| **Benchmarking** | Real-time latency, FPS, memory, and thermal monitoring |
| **Multi-Language** | 6 languages with full RTL support |

### 🏥 Clinical Intelligence

| Feature | Description |
|---|---|
| **Clinical Rules Engine** | Configurable clinical threshold rules applied post-inference |
| **Referral Tracking** | Referral cards generated with QR patient identifiers |
| **Clinical Warnings** | Severity banners for urgent conditions requiring immediate referral |
| **Result Comparison** | Compare screening results across sessions for the same patient |
| **Action Prompts** | Condition-specific recommended next actions for CHWs |

### 🔒 Security & Compliance

| Feature | Description |
|---|---|
| **End-to-End Encryption** | All stored patient data encrypted using AES-256 |
| **Audit Logs** | Every screening event logged with tamper-proof audit trail |
| **PII Minimization** | Only medically necessary data collected (GDPR by design) |
| **Checksum Validation** | ONNX model files verified via SHA-256 on every load |
| **HIPAA Compliant** | Data handling aligned with HIPAA Privacy Rule |

---

## 🔬 Supported Screenings

### 🧴 Skin Screening
- Conditions: Melanoma, Dermatitis, Psoriasis, Eczema, Rosacea, Fungal Infections
- Input: Single photograph under defined lighting conditions
- Model: `skin_v1.onnx` — MobileNetV3 backbone, fine-tuned on ISIC + custom dataset
- Output: Condition label, confidence, severity, recommended action

### 👁️ Eye Screening
- Conditions: Conjunctivitis, Cataracts, Glaucoma signs, Diabetic Retinopathy markers
- Input: Slit-lamp style close-up photograph
- Model: `eye_v1.onnx` — EfficientNet backbone
- Output: Condition label, confidence, referral urgency flag

### 🦷 Oral Screening
- Conditions: Oral ulcers, Candidiasis, Caries indicators, Periodontal disease signs
- Input: Intraoral photograph
- Model: `oral_v1.onnx` — ResNet50 backbone
- Output: Condition label, confidence, hygiene recommendation

### 🩹 Wound Screening
- Conditions: Infected wound, Chronic ulcer, Healing classification, Gangrene indicators
- Input: Wound photograph under neutral lighting
- Model: `wound_v1.onnx` — Custom segmentation + classification head
- Output: Wound classification, infection likelihood, dressing recommendation

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         MOBILE (Expo Router)                        │
│                                                                     │
│  ┌───────────┐   ┌──────────┐   ┌──────────┐   ┌────────────────┐  │
│  │  Camera   │   │  ONNX    │   │  SQLite  │   │  Sync Manager  │  │
│  │  Capture  │──▶│  Runtime │──▶│ Encrypted│──▶│  (BullMQ-like) │  │
│  └───────────┘   └──────────┘   └──────────┘   └────────────────┘  │
│        │              │                                │             │
│  ┌─────▼──────────────▼──────────────────────┐        │             │
│  │           Clinical Rules Engine            │        │             │
│  │    (Thresholds · Abstention · Referral)    │        │             │
│  └───────────────────────────────────────────┘        │             │
└──────────────────────────────────────────────────────│──────────────┘
                                                        │ HTTPS (when online)
                                                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       BACKEND (FastAPI)                             │
│                                                                     │
│  ┌───────────┐   ┌──────────┐   ┌──────────┐   ┌────────────────┐  │
│  │   Sync    │   │Analytics │   │Telemetry │   │    Reports     │  │
│  │   API     │   │  API     │   │   API    │   │     API        │  │
│  └─────┬─────┘   └────┬─────┘   └────┬─────┘   └───────┬────────┘  │
│        └──────────────┴──────────────┴────────────────┘            │
│                             │                                        │
│              ┌──────────────▼──────────────┐                        │
│              │        PostgreSQL DB         │                        │
│              │  (Alembic Migrations)        │                        │
│              └─────────────────────────────┘                        │
│                                                                     │
│  ┌──────────────────┐   ┌─────────────────────────────────────────┐ │
│  │   Redis Queue    │──▶│   Workers: Sync · Analytics · Cleanup   │ │
│  └──────────────────┘   └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    INFRASTRUCTURE                                    │
│   Nginx · Kubernetes · Terraform · Prometheus · Grafana             │
└─────────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
Camera Capture
     │
     ▼
Image Preprocessing (imagePreprocess.ts)
     │  — Resize, normalize, format conversion
     ▼
ONNX Runtime Inference (useInference.ts)
     │  — Local on-device, no network call
     ▼
Post-processing (ml/serving/postprocess.py equivalent in TS)
     │  — Softmax, top-K, confidence calibration
     ▼
Clinical Rules Engine (clinicalRules.ts)
     │  — Thresholds, abstention, severity classification
     ▼
Result Display + Encrypted SQLite Write
     │
     ▼ (when online)
Sync Queue → FastAPI Backend → PostgreSQL
```

---

## 🛠️ Tech Stack

### Mobile
| Layer | Technology |
|---|---|
| Framework | React Native (Expo SDK 51) |
| Router | Expo Router (file-based) |
| Language | TypeScript |
| AI Inference | ONNX Runtime for React Native |
| Local DB | SQLite (expo-sqlite, encrypted) |
| State Management | Zustand |
| Auth | Expo LocalAuthentication (biometrics) + PIN |
| Camera | Expo Camera |
| Charts | Victory Native |
| PDF | React Native HTML to PDF |
| Testing | Jest + React Native Testing Library |
| Build | EAS Build |

### Backend
| Layer | Technology |
|---|---|
| Framework | FastAPI (Python 3.11+) |
| ORM | SQLAlchemy + Alembic |
| Database | PostgreSQL 16 |
| Queue | Redis + Celery workers |
| Auth | JWT + bcrypt |
| Validation | Pydantic v2 |
| Testing | Pytest |
| Containerization | Docker |

### ML Pipeline
| Layer | Technology |
|---|---|
| Training | PyTorch 2.x |
| Experiment Tracking | Weights & Biases + MLflow + TensorBoard |
| Data Versioning | DVC |
| Export | ONNX (opset 17) |
| Quantization | PyTorch static + dynamic quantization |
| Validation | scikit-learn, fairlearn |
| Notebooks | Jupyter |

### Infrastructure
| Layer | Technology |
|---|---|
| Orchestration | Docker Compose (local) · Kubernetes (production) |
| IaC | Terraform |
| Reverse Proxy | Nginx |
| Monitoring | Prometheus + Grafana |
| CI/CD | GitHub Actions |
| Monorepo | Turborepo + pnpm workspaces |

---

## 📁 Project Structure

```
mediscan-local/
│
├── README.md                     # This file
├── LICENSE                       # Project license
├── SECURITY.md                   # Security policy
├── CONTRIBUTING.md               # Contribution guide
├── CODE_OF_CONDUCT.md            # Community standards
├── .env.example                  # Environment variable template
├── docker-compose.yml            # Full-stack local orchestration
├── Makefile                      # Dev task shortcuts
├── package.json                  # Root workspace package
├── pnpm-workspace.yaml           # pnpm workspace config
├── turbo.json                    # Turborepo pipeline config
│
├── .github/
│   ├── ISSUE_TEMPLATE/           # Bug, feature, model issue templates
│   ├── PULL_REQUEST_TEMPLATE.md  # PR checklist
│   └── workflows/                # CI/CD pipelines (7 total)
│
├── mobile/                       # React Native (Expo) application
│   ├── app/                      # File-based routes (Expo Router)
│   │   ├── onboarding/           # Welcome, consent, language, permissions
│   │   ├── auth/                 # PIN + biometric authentication
│   │   ├── (tabs)/               # Main navigation tabs
│   │   ├── screening/            # Screening flow (capture → result)
│   │   ├── reports/              # PDF generation + export
│   │   └── admin/                # Telemetry, sync, benchmark screens
│   ├── components/               # Reusable UI components
│   │   ├── camera/               # Camera capture, overlay, focus guide
│   │   ├── screening/            # Cards, differentials, recommendations
│   │   ├── results/              # Result display, confidence bar, severity
│   │   ├── chw/                  # Patient queue, batch sessions, referrals
│   │   ├── charts/               # Analytics charts
│   │   ├── common/               # Buttons, modals, inputs, loaders
│   │   └── benchmark/            # Latency, memory, thermal, FPS meters
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Core utilities and services
│   ├── services/                 # Service layer (inference, sync, auth)
│   ├── store/                    # Zustand state stores
│   ├── locales/                  # i18n JSON files (6 languages)
│   ├── models/                   # Bundled ONNX models + metadata
│   │   ├── skin/                 # skin_v1.onnx + labels + checksum
│   │   ├── eye/                  # eye_v1.onnx + labels + checksum
│   │   ├── oral/                 # oral_v1.onnx + labels + checksum
│   │   ├── wound/                # wound_v1.onnx + labels + checksum
│   │   └── model_manifest.json   # Model registry + version control
│   └── tests/                    # Unit + integration tests
│
├── backend/                      # FastAPI Python backend
│   ├── app/
│   │   ├── api/routes/           # REST API endpoints
│   │   ├── core/                 # Config, security, middleware, logging
│   │   ├── db/                   # Database base, sessions, init
│   │   ├── models/               # SQLAlchemy ORM models
│   │   ├── schemas/              # Pydantic request/response schemas
│   │   ├── services/             # Business logic layer
│   │   ├── workers/              # Async background workers
│   │   └── utils/                # Shared utilities
│   ├── tests/                    # API, service, DB, integration tests
│   ├── alembic/                  # Database migration scripts
│   ├── scripts/                  # seed_db, create_admin, benchmark
│   └── Dockerfile
│
├── ml/                           # Machine learning pipeline
│   ├── data/                     # Raw, processed, calibration, splits
│   ├── datasets/                 # PyTorch Dataset classes
│   ├── training/                 # Training scripts per modality
│   ├── models/                   # Model architecture definitions
│   ├── augmentation/             # Augmentation policies
│   ├── export/                   # ONNX export + quantization
│   ├── validation/               # Clinical metrics, fairness, calibration
│   ├── serving/                  # Inference + pre/post-processing
│   ├── notebooks/                # Exploration and analysis
│   └── experiments/              # Configs, checkpoints, runs
│
├── docs/                         # Project documentation
│   ├── architecture.md           # System architecture deep dive
│   ├── api.md                    # API reference
│   ├── model-card.md             # Model cards for all 4 modalities
│   ├── fairness.md               # Fairness evaluation methodology
│   ├── chw-guide.md              # Field guide for health workers
│   └── ...                       # 14 docs total
│
├── infra/                        # Infrastructure as Code
│   ├── nginx/                    # Nginx config
│   ├── terraform/                # Cloud provisioning (main, vars, outputs)
│   ├── kubernetes/               # Backend + DB + Redis deployments
│   └── monitoring/               # Prometheus + Grafana dashboard
│
├── scripts/                      # Root-level automation scripts
│   ├── bootstrap.sh              # Full environment bootstrap
│   ├── train_all.sh              # Train all 4 models
│   ├── export_all.sh             # Export all models to ONNX
│   ├── benchmark_all.sh          # Run all benchmark suites
│   ├── validate_all.sh           # Run all model validations
│   ├── release.sh                # Release pipeline
│   └── clean.sh                  # Clean build artifacts
│
├── security/                     # Security documentation
│   ├── threat-model.md
│   ├── pii-policy.md
│   ├── encryption-spec.md
│   ├── audit-log-policy.md
│   └── vulnerability-management.md
│
└── research/                     # Research artifacts
    ├── papers/                   # Reference literature
    ├── benchmarks/               # Benchmark results
    ├── clinical-validation.md
    └── fairness-evaluation.md
```

---

## ✅ Prerequisites

Ensure the following are installed before starting:

### Required (All)
| Tool | Version | Install |
|---|---|---|
| Node.js | 20 LTS | [nodejs.org](https://nodejs.org) |
| pnpm | 9.x | `npm i -g pnpm` |
| Python | 3.11+ | [python.org](https://python.org) |
| Docker | 25+ | [docker.com](https://www.docker.com) |
| Docker Compose | v2 plugin | Bundled with Docker Desktop |
| Git | 2.40+ | [git-scm.com](https://git-scm.com) |

### Mobile Development
| Tool | Version | Install |
|---|---|---|
| Expo CLI | Latest | `npm i -g expo-cli` |
| EAS CLI | Latest | `npm i -g eas-cli` |
| Android Studio | Hedgehog+ | For Android emulator |
| Xcode | 15+ | Mac only, for iOS simulator |

### ML Pipeline (Optional)
| Tool | Version | Install |
|---|---|---|
| CUDA | 12.x | For GPU training |
| DVC | 3.x | `pip install dvc` |
| Weights & Biases | Latest | [wandb.ai](https://wandb.ai) |

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/ibtesaamaslam/MediScan-V2.0.0.git
cd MediScan-V2.0.0

# 2. Bootstrap all dependencies (installs Node + Python packages)
chmod +x scripts/bootstrap.sh
./scripts/bootstrap.sh

# 3. Configure environment variables
cp .env.example .env
nano .env   # Fill in required values (see Environment Setup below)

# 4. Start all services with Docker
docker compose up -d

# 5. Run database migrations
cd backend
alembic upgrade head
cd ..

# 6. Start the mobile app
cd mobile
npx expo start
```

---

## 🔐 Environment Setup

Copy `.env.example` to `.env` and fill in all required values:

```bash
cp .env.example .env
```

### Backend Variables

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mediscan
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
POSTGRES_DB=mediscan

# Security
JWT_SECRET=your-minimum-32-character-random-secret
JWT_EXPIRE_MINUTES=60
ENCRYPTION_KEY=your-32-byte-aes-key

# Redis
REDIS_URL=redis://localhost:6379/0

# Environment
ENVIRONMENT=development         # development | staging | production
LOG_LEVEL=INFO
CORS_ORIGINS=http://localhost:3000,http://localhost:8081

# Rate Limiting
RATE_LIMIT_PER_MINUTE=60
```

### Mobile Variables (prefix EXPO_PUBLIC_)

```env
EXPO_PUBLIC_API_URL=http://localhost:8000
EXPO_PUBLIC_API_SECRET=your-api-secret-key
EXPO_PUBLIC_SYNC_INTERVAL_MS=30000
EXPO_PUBLIC_OFFLINE_MODE=false
EXPO_PUBLIC_TELEMETRY_ENABLED=true
```

### Optional (Monitoring / ML Tracking)

```env
# Sentry
SENTRY_DSN=https://your-sentry-dsn

# Weights & Biases (ML training)
WANDB_API_KEY=your-wandb-key
WANDB_PROJECT=mediscan-v2

# MLflow
MLFLOW_TRACKING_URI=http://localhost:5000
```

---

## ▶️ Running the App

### Option A — Full Stack with Docker (Recommended)

```bash
# Start all services: Backend, PostgreSQL, Redis, Nginx
docker compose up -d

# View logs
docker compose logs -f backend
docker compose logs -f

# Stop all services
docker compose down

# Rebuild after code changes
docker compose up -d --build backend
```

Services available after startup:

| Service | URL |
|---|---|
| Backend API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |
| API Docs (ReDoc) | http://localhost:8000/redoc |
| Health Check | http://localhost:8000/api/health |
| Grafana Dashboard | http://localhost:3000 |
| Prometheus Metrics | http://localhost:9090 |

---

### Option B — Manual (Each Service Separately)

#### Backend (FastAPI)

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate      # Linux/Mac
venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Apply database migrations
alembic upgrade head

# Seed initial data (dev only)
python scripts/seed_db.py

# Create admin account
python scripts/create_admin.py

# Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Mobile (Expo)

```bash
cd mobile

# Install dependencies
pnpm install

# Start Expo dev server
npx expo start

# Run on Android
npx expo run:android

# Run on iOS (Mac only)
npx expo run:ios

# Clear cache and restart
npx expo start --clear
```

#### Run All Packages (Turborepo)

```bash
# From root — runs dev scripts in all packages in parallel
pnpm turbo dev

# Build all packages
pnpm turbo build

# Run all tests
pnpm turbo test

# Run linting
pnpm turbo lint
```

---

### Makefile Shortcuts

The `Makefile` provides shorthand commands for common tasks:

```bash
make install          # Install all dependencies
make dev              # Start all services in dev mode
make build            # Build all packages
make test             # Run all test suites
make lint             # Run linting on all packages
make migrate          # Apply all DB migrations
make seed             # Seed development database
make clean            # Remove build artifacts and __pycache__
make docker-up        # Start Docker Compose
make docker-down      # Stop Docker Compose
make benchmark        # Run all benchmark suites
make validate         # Validate all ML models
```

---

## 🧠 ML Model Pipeline

The `ml/` directory contains the complete pipeline for training, validating, exporting, and optimizing models.

### Step 1 — Data Preparation

```bash
cd ml

# Initialize DVC (data version control)
dvc init
dvc pull    # Pull data from remote (configure remote in .dvc/config)

# Verify dataset manifest
cat data/dataset_manifest.json
```

### Step 2 — Training

```bash
# Train individual models
python training/train_skin.py --config experiments/configs/skin_config.yaml
python training/train_eye.py  --config experiments/configs/eye_config.yaml
python training/train_oral.py --config experiments/configs/oral_config.yaml
python training/train_wound.py --config experiments/configs/wound_config.yaml

# Or train all at once
chmod +x ../scripts/train_all.sh
../scripts/train_all.sh

# Monitor with W&B
# Training automatically logs to wandb if WANDB_API_KEY is set
```

### Step 3 — Validation & Fairness

```bash
# Validate a trained model
python validation/validate_model.py --model skin --checkpoint experiments/checkpoints/skin_best.pt

# Generate clinical metrics (sensitivity, specificity, AUC)
python validation/clinical_metrics.py --model skin

# Generate fairness report (subgroup analysis across demographics)
python validation/fairness_report.py --model skin

# Calibration analysis
python validation/calibration_metrics.py --model skin

# ROC analysis
python validation/roc_analysis.py --model skin

# Run all validations
../scripts/validate_all.sh
```

### Step 4 — Export to ONNX

```bash
# Export model to ONNX format
python export/export_onnx.py --model skin --output ../mobile/models/skin/skin_v1.onnx

# Static quantization (smaller, faster on CPU)
python export/static_quantize.py --model skin

# Dynamic quantization
python export/dynamic_quantize.py --model skin

# Optimize ONNX graph
python export/optimize_graph.py --model skin

# Generate model manifest
python export/generate_manifest.py

# Export all models
../scripts/export_all.sh
```

### Step 5 — Mobile Integration

After export, ONNX model files are placed in `mobile/models/<type>/`:

```
mobile/models/skin/
├── skin_v1.onnx          # Exported ONNX model
├── labels.json           # Class label mapping
├── metadata.json         # Input shape, normalization params
└── checksum.sha256       # Integrity hash for runtime validation
```

The `model_manifest.json` tracks all deployed model versions and is read by `modelLoader.ts` at app startup. If a checksum fails, the model is rejected and the user is notified.

---

## 👩‍⚕️ Community Health Worker (CHW) Mode

MediScan includes a dedicated CHW workflow designed for field workers screening multiple patients in sequence.

### CHW Features

- **Patient Queue** — Manage an ordered list of patients for a session
- **QR Scanner** — Scan QR codes to identify patients without typing
- **Batch Sessions** — Process multiple patients with auto-session management
- **Session Summary** — End-of-session report with all screenings, referrals, and actions
- **Referral Tracker** — Track which patients were referred and to where
- **Print Reports** — Generate printable referral letters and patient summaries

### CHW Navigation

Accessible via the `chw` tab in the main navigation:

```
Tabs → CHW
  ├── Patient Queue (PatientQueue.tsx)
  ├── Active Session (BatchSession.tsx)
  ├── Session Summary (SessionSummary.tsx)
  ├── Referral Tracker (ReferralTracker.tsx)
  └── Print Report (PrintReport.tsx)
```

---

## 🧪 Testing

### Mobile Tests

```bash
cd mobile

# Run all tests
pnpm test

# Run with coverage report
pnpm test --coverage

# Watch mode (development)
pnpm test --watch

# Test specific file
pnpm test hooks/useInference

# Run component tests only
pnpm test components/
```

### Backend Tests

```bash
cd backend
source venv/bin/activate

# Run all tests
pytest

# With verbose output
pytest -v

# With coverage
pytest --cov=app --cov-report=html

# Run specific test module
pytest tests/api/test_sync.py

# Run integration tests only
pytest tests/integration/

# Run with test marks
pytest -m "not slow"
```

### ML Tests

```bash
cd ml

# Run ML test suites
pytest tests/

# Test training pipeline
pytest tests/training/

# Test ONNX export
pytest tests/export/

# Test serving runtime
pytest tests/serving/

# Test validation scripts
pytest tests/validation/
```

### Full Test Suite (Root)

```bash
# Run all tests across all packages
pnpm turbo test

# Or via Makefile
make test
```

---

## 🚢 Deployment

### Docker Compose (Staging / Production)

```bash
# Build production images
docker compose -f docker-compose.yml -f docker-compose.prod.yml build

# Start production stack
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Apply migrations in production
docker compose exec backend alembic upgrade head

# Check all services are healthy
docker compose ps
curl http://localhost:8000/api/health
```

### Kubernetes (Production Cluster)

```bash
# Apply all Kubernetes manifests
kubectl apply -f infra/kubernetes/

# Verify deployments
kubectl get pods -n mediscan
kubectl get services -n mediscan

# View backend logs
kubectl logs -f deployment/mediscan-backend -n mediscan

# Scale backend
kubectl scale deployment mediscan-backend --replicas=3 -n mediscan
```

### Terraform (Cloud Infrastructure)

```bash
cd infra/terraform

# Initialize Terraform
terraform init

# Preview infrastructure changes
terraform plan -var-file="production.tfvars"

# Apply infrastructure
terraform apply -var-file="production.tfvars"
```

### EAS Build (Mobile)

```bash
cd mobile

# Login to Expo account
eas login

# Build for Android (APK for field distribution)
eas build --platform android --profile production

# Build for iOS (IPA)
eas build --platform ios --profile production

# Submit to stores
eas submit --platform android
eas submit --platform ios

# OTA update (without full app store update)
eas update --branch production --message "Hotfix: inference threshold update"
```

---

## 🔒 Security & Privacy

MediScan was designed with patient data protection as a first-class concern.

### Encryption

- **On-Device Storage**: All SQLite data encrypted with AES-256 using a device-derived key (see `lib/encryption.ts`)
- **API Transport**: TLS 1.3 enforced for all sync communications
- **Backend Storage**: PostgreSQL data encrypted at rest via platform-level encryption

### Authentication

```
App Launch
    │
    ▼
Biometric Check (Face ID / Fingerprint)
    │ — Fails or unavailable
    ▼
PIN Entry (local hash comparison)
    │ — Both fail
    ▼
Access Denied
```

### Audit Logging

Every screening event generates an immutable audit log entry (see `audit-log-policy.md`):

```json
{
  "event_id": "uuid",
  "timestamp": "ISO8601",
  "event_type": "SCREENING_COMPLETED",
  "device_id": "hashed",
  "session_id": "uuid",
  "model_version": "skin_v1",
  "action": "RESULT_DISPLAYED",
  "pii_included": false
}
```

### PII Handling

- Patient data is stored with minimum required fields only
- No images are stored after inference unless explicitly enabled by the deployment admin
- PHI fields are encrypted individually at the field level
- Right-to-erasure requests are handled via `DELETE /api/patients/{id}` with cascading deletion

### Security Scanning

The `security-scan.yml` GitHub Actions workflow runs on every PR:
- Dependency vulnerability scanning (npm audit + pip-audit)
- Secret detection (Gitleaks)
- SAST analysis (Semgrep)
- Docker image scanning (Trivy)

See `security/threat-model.md` for full threat model and mitigations.

---

## 🌐 Multi-Language Support

MediScan supports 6 languages with full i18n:

| Code | Language | Script | RTL |
|---|---|---|---|
| `en` | English | Latin | No |
| `ur` | Urdu | Arabic | ✅ Yes |
| `hi` | Hindi | Devanagari | No |
| `sw` | Swahili | Latin | No |
| `bn` | Bengali | Bengali | No |
| `ha` | Hausa | Latin | No |

### Adding a New Language

```bash
# 1. Create locale file
cp mobile/locales/en.json mobile/locales/fr.json

# 2. Translate all keys in fr.json

# 3. Register in config
# Edit mobile/locales/config.ts and add 'fr' to the supported locales

# 4. Test
npx expo start
# Use Settings → Language → French
```

### RTL Support

RTL is handled by `RTLWrapper.tsx` which wraps all screens. Languages flagged as RTL in `locales/config.ts` automatically flip:
- Text alignment
- Icon directions
- Flex row layouts
- Animation directions

---

## 📊 Benchmarking

MediScan includes a full benchmarking suite for measuring performance on real hardware. Accessible via `Admin → Benchmarks` in the app, or via CLI:

### On-Device Benchmarks

Available via the `benchmark/` components and `useBenchmark` hook:

| Metric | Component | Target |
|---|---|---|
| Inference Latency | `LatencyMeter.tsx` | < 500ms |
| Memory Usage | `MemoryProfiler.tsx` | < 200MB |
| Thermal State | `ThermalMonitor.tsx` | < Fair |
| FPS during capture | `FPSCounter.tsx` | ≥ 24fps |

### CLI Benchmarking

```bash
# Benchmark all models for latency + accuracy
chmod +x scripts/benchmark_all.sh
./scripts/benchmark_all.sh

# Backend API benchmark
cd backend
python scripts/benchmark.py --endpoint /api/sync --requests 100 --concurrency 10

# ML inference latency benchmark
cd ml
python validation/latency_benchmark.py --model skin --device cpu --iterations 100
```

### Model Benchmark Targets

| Modality | Inference Time (CPU) | Model Size | Top-1 Acc. |
|---|---|---|---|
| Skin | < 350ms | < 8MB | > 87% |
| Eye | < 300ms | < 6MB | > 85% |
| Oral | < 300ms | < 6MB | > 83% |
| Wound | < 400ms | < 10MB | > 80% |

---

## ⚙️ CI/CD Pipelines

Seven GitHub Actions workflows run automatically:

| Workflow | Trigger | What it Does |
|---|---|---|
| `mobile-ci.yml` | PR, push to main | Install, lint, type-check, test mobile |
| `backend-ci.yml` | PR, push to main | Install, lint, test backend, check migrations |
| `ml-validate.yml` | PR to ml/ | Validate model outputs, fairness checks |
| `docker-build.yml` | Push to main | Build and push Docker images to registry |
| `security-scan.yml` | PR, push to main | Dependency scan, SAST, secret detection |
| `release.yml` | Tag push (v*.*.*) | Build, sign, publish release artifacts |
| `benchmark.yml` | Schedule (weekly) | Run performance regression benchmarks |

---

## 🤝 Contributing

We welcome contributions from developers, clinicians, and researchers.

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/your-feature-name

# 3. Make your changes
# 4. Run tests
pnpm turbo test

# 5. Run linting
pnpm turbo lint

# 6. Commit your changes
git commit -m "feat: add your feature description"

# 7. Push and open a Pull Request
git push origin feature/your-feature-name
```

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Code style guide
- Commit message conventions
- PR review process
- Clinical accuracy requirements for model contributions
- Dataset contribution policy

For model-related issues (accuracy, fairness, calibration), use the [Model Issue Template](./.github/ISSUE_TEMPLATE/model_issue.md).

---

## ⚕️ Clinical Disclaimer

> **MediScan is a clinical decision support tool, not a diagnostic device.**

MediScan's AI models are designed to assist trained health workers and clinicians — not to replace their judgment. All screening results:

- Are presented as probability estimates with calibrated confidence, not definitive diagnoses
- Include abstention logic to decline analysis when confidence is below clinical thresholds
- Must be reviewed by a qualified clinician before any treatment decision is made
- Should be considered alongside patient history, physical examination, and other diagnostics

MediScan has not received regulatory clearance (FDA, CE, CDSCO, etc.) as a medical device. Deploying organizations are responsible for ensuring use within applicable regulatory frameworks.

See [`docs/clinical-collaboration.md`](./docs/clinical-collaboration.md) for guidelines on clinical validation partnerships.

---

## 🗺️ Roadmap

- [ ] Malaria blood smear module
- [ ] Tuberculosis sputum smear module
- [ ] Voice-based symptom intake for low-literacy users
- [ ] Federated learning for privacy-preserving model improvement
- [ ] FHIR R4 compliance for hospital system integration
- [ ] WhatsApp/SMS referral notifications for patients
- [ ] Web dashboard for clinic administrators
- [ ] Multi-device CHW synchronization

---

## 📄 License

This project is licensed under the terms found in the [LICENSE](./LICENSE) file.

---

## 🙏 Acknowledgements

- ISIC Archive for open dermatology datasets
- WHO Digital Health Guidelines for clinical framework
- The open-source contributors who make ONNX Runtime, FastAPI, and Expo possible
- Clinical partners who provided validation and annotation support

---

<div align="center">

**Built with ❤️ for communities that need it most.**

</div>
