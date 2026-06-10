import { useState, useCallback } from 'react';
import { ONNXService } from '../services/inference/ONNXService';
import { TensorBuilder } from '../services/inference/TensorBuilder';
import { ResultInterpreter, InterpretedResult } from '../services/inference/ResultInterpreter';
import { ModelLoader } from '../services/inference/ModelLoader';

export interface InferenceState {
  isLoadingModel: boolean;
  isProcessing: boolean;
  activeModelName: string | null;
  error: string | null;
  result: InterpretedResult | null;
}

export function useInference() {
  const [state, setState] = useState<InferenceState>({
    isLoadingModel: false,
    isProcessing: false,
    activeModelName: null,
    error: null,
    result: null,
  });

  const runClassifier = useCallback(async (
    moduleType: 'skin' | 'eye' | 'oral' | 'wound',
    imageUri: string
  ) => {
    setState(prev => ({ ...prev, isProcessing: true, error: null, result: null }));
    try {
      const modelName = `${moduleType}_pathology`;
      const modelPath = `/assets/models/${modelName}.onnx`;

      // 1. Ensure the assets are downloaded and verified
      await ModelLoader.verifyModelIntegrity(moduleType);

      // 2. Compile model session if not loaded
      setState(prev => ({ ...prev, isLoadingModel: true }));
      await ONNXService.loadSession(modelName, modelPath);
      setState(prev => ({ ...prev, isLoadingModel: false, activeModelName: modelName }));

      // 3. Transform image URI to dynamic float32 input tensors conforming to ImageNet standard
      const tensor = await TensorBuilder.imageToTensor(imageUri);

      // 4. Run ONNX feedforward evaluation
      const logits = await ONNXService.runInference(modelName, tensor);

      // 5. Interpret outputs through softmax calibration
      const interpretation = ResultInterpreter.interpretLogits(moduleType, logits);

      setState(prev => ({
        ...prev,
        isProcessing: false,
        result: interpretation,
      }));

      return interpretation;
    } catch (err: any) {
      console.error('[useInference] Inference failure:', err);
      setState(prev => ({
        ...prev,
        isLoadingModel: false,
        isProcessing: false,
        error: err.message || 'Execution error during float arithmetic pipeline.',
      }));
      return null;
    }
  }, []);

  const releaseCurrentSession = useCallback(async () => {
    if (state.activeModelName) {
      await ONNXService.releaseSession(state.activeModelName);
      setState(prev => ({ ...prev, activeModelName: null }));
    }
  }, [state.activeModelName]);

  const clearResults = useCallback(() => {
    setState(prev => ({ ...prev, result: null, error: null }));
  }, []);

  return {
    ...state,
    runClassifier,
    releaseCurrentSession,
    clearResults,
  };
}
