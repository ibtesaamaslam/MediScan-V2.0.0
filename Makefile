.PHONY: bootstrap mobile-start backend-dev ml-train test clean help

bootstrap: ## Install dependencies across all packages and configure local workspace
	@echo "Bootstrapping MediScan Local workspace..."
	@npm install
	@echo "Workspace ready!"

mobile-start: ## Launch the Expo/React Native mobile development server
	@echo "Running mobile app..."
	cd mobile && npm run dev

backend-dev: ## Boot FastAPI local backend with reloading enabled
	@echo "Running local backend server..."
	cd backend && uvicorn app.main:app --reload --port 8000

ml-train: ## Train the default skin disease classifier model
	@echo "Starting ML training pipeline for SkinNet..."
	python ml/training/train_skin.py

test: ## Execute all unit and integration tests
	@echo "Executing multi-suite testing protocol..."
	cd mobile && npm run test
	cd backend && pytest

clean: ## Purge build artifacts, caching files, and node folders
	@echo "Cleaning up generated assets..."
	rm -rf dist mobile/.expo mobile/dist backend/__pycache__ ml/__pycache__

help: ## Display the list of available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'
