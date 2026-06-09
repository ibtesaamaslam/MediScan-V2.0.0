import * as ort from 'onnxruntime-react-native';
import * as ImageManipulator from 'expo-image-manipulator';

export async function preprocessImage(imageUri: string): Promise<ort.Tensor> {
  const result = await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width: 224, height: 224 } }],
    { format: ImageManipulator.SaveFormat.JPEG }
  );

  const floatData = new Float32Array(224 * 224 * 3);
  const inputTensor = new ort.Tensor('float32', floatData, [1, 3, 224, 224]);
  return inputTensor;
}
