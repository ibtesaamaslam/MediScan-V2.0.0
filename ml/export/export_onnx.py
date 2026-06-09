import torch
from models.skin_model import SkinNet

model = SkinNet(num_classes=7)
state = torch.load("checkpoints/best_skin_model.pt", map_location="cpu")
model.load_state_dict(state)
model.eval()

dummy_input = torch.randn(1, 3, 224, 224)

torch.onnx.export(
    model,
    dummy_input,
    "checkpoints/skin_v1.onnx",
    input_names=["input"],
    output_names=["output"],
    dynamic_axes={"input": {0: "batch"}, "output": {0: "batch"}},
    opset_version=17
)

print("ONNX export completed.")
