import numpy as np
from onnxruntime.quantization import (
    CalibrationDataReader,
    QuantFormat,
    QuantType,
    quantize_static
)
from PIL import Image
from pathlib import Path

class SkinCalibrationReader(CalibrationDataReader):
    def __init__(self, calibration_dir):
        self.image_paths = list(Path(calibration_dir).glob("**/*.jpg"))
        self.index = 0

    def get_next(self):
        if self.index >= len(self.image_paths):
            return None

        image = Image.open(self.image_paths[self.index]).convert("RGB").resize((224, 224))
        arr = np.asarray(image).astype(np.float32) / 255.0
        arr = np.transpose(arr, (2, 0, 1))
        arr = arr[np.newaxis, ...]

        self.index += 1
        return {"input": arr}

reader = SkinCalibrationReader("data/calibration/skin")

quantize_static(
    model_input="checkpoints/skin_v1.onnx",
    model_output="checkpoints/skin_v1_int8.onnx",
    calibration_data_reader=reader,
    quant_format=QuantFormat.QDQ,
    activation_type=QuantType.QUInt8,
    weight_type=QuantType.QInt8
)

print("Static quantization completed.")
