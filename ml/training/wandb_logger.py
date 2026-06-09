class WandbLogger:
    def __init__(self, project_name="mediscan-local"):
        self.project_name = project_name
        print(f"Weights & Biases monitoring initialized: Project {project_name}")

    def log_metrics(self, epoch: int, loss: float, accuracy: float):
        print(f"[W&B LOG] Epoch {epoch} | Loss: {loss:.4f} | Accuracy: {accuracy:.4f}")
