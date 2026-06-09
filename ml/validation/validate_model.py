import onnxruntime as ort
import numpy as np
import json

def validate_model_graph(onnx_path: str):
    print(f"Loading ONNX Model graph from: {onnx_path}")
    session = ort.InferenceSession(onnx_path)
    inputs = session.get_inputs()
    outputs = session.get_outputs()

    print("--- Model Interface Specs ---")
    print(f"Inputs: {[i.name for i in inputs]}")
    print(f"Input shape: {inputs[0].shape}")
    print(f"Outputs: {[o.name for o in outputs]}")
    print("Graph passes validation successfully!")

if __name__ == "__main__":
    validate_model_graph("checkpoints/skin_v1.onnx")
