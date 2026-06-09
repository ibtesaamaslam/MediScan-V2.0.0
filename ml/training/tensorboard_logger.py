class TensorBoardLogger:
    def __init__(self, log_dir="runs/logs"):
        self.log_dir = log_dir
        print(f"TensorBoard event writer configured. Path: {log_dir}")

    def add_scalar(self, name: str, value: float, step: int):
        pass
