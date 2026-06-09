import * as ort from 'onnxruntime-react-native';
import * as FileSystem from 'expo-file-system';
import { preprocessImage } from '../lib/imagePreprocess';

const LABELS = [
  'Fungal Infection',
  'Eczema',
  'Psoriasis',
  'Scabies',
  'Vitiligo',
  'Benign Growth'
];

let skinSession: ort.InferenceSession | null = null;

export async function loadSkinModel() {
  if (skinSession) return skinSession;

  const modelUri = FileSystem.bundleDirectory + 'models/skin_v1.onnx';
  skinSession = await ort.InferenceSession.create(modelUri);
  return skinSession;
}

function softmax(values: Float32Array) {
  const max = Math.max(...values);
  const exps = Array.from(values, v => Math.exp(v - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(v => v / sum);
}

export async function runSkinInference(imageUri: string) {
  const session = await loadSkinModel();
  const inputTensor = await preprocessImage(imageUri);

  const results = await session.run({ input: inputTensor });
  const raw = results.output.data as Float32Array;
  const probs = softmax(raw);

  let maxIndex = 0;
  let maxValue = probs[0];

  for (let i = 1; i < probs.length; i++) {
    if (probs[i] > maxValue) {
      maxValue = probs[i];
      maxIndex = i;
    }
  }

  const confidence = maxValue;
  const label = LABELS[maxIndex] ?? 'Unknown';

  return {
    label,
    confidence,
    recommendation:
      confidence < 0.6
        ? 'Inconclusive. Seek professional medical review.'
        : 'Visit a clinic for further confirmation.'
  };
}
