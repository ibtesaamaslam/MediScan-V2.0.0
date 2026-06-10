import { InterpretedResult } from '../services/inference/ResultInterpreter';

// Screening State for immediate capture-to-evaluation pipeline
export interface ScreeningState {
  activeModule: 'skin' | 'eye' | 'oral' | 'wound' | null;
  imageUri: string | null;
  processing: boolean;
  modelLoaded: boolean;
  calibrationLoaded: boolean;
  result: InterpretedResult | null;
  error: string | null;
}

type Subscriber = (state: ScreeningState) => void;

class ScreeningStore {
  private state: ScreeningState = {
    activeModule: null,
    imageUri: null,
    processing: false,
    modelLoaded: false,
    calibrationLoaded: false,
    result: null,
    error: null,
  };

  private subscribers: Set<Subscriber> = new Set();

  getState(): ScreeningState {
    return { ...this.state };
  }

  updateState(updater: Partial<ScreeningState> | ((state: ScreeningState) => Partial<ScreeningState>)): void {
    const nextState = typeof updater === 'function' ? updater(this.state) : updater;
    this.state = { ...this.state, ...nextState };
    this.notify();
  }

  subscribe(sub: Subscriber): () => void {
    this.subscribers.add(sub);
    return () => this.subscribers.delete(sub);
  }

  private notify(): void {
    for (const sub of this.subscribers) {
      sub(this.state);
    }
  }

  selectModule(module: 'skin' | 'eye' | 'oral' | 'wound' | null) {
    this.updateState({
      activeModule: module,
      imageUri: null,
      result: null,
      error: null,
      modelLoaded: false,
      calibrationLoaded: false,
    });
  }

  setCapturedImage(uri: string) {
    this.updateState({ imageUri: uri, result: null, error: null });
  }

  setPipelineLoading(val: boolean) {
    this.updateState({ processing: val });
  }

  setModelStatus(loaded: boolean) {
    this.updateState({ modelLoaded: loaded });
  }

  setCalibrationStatus(loaded: boolean) {
    this.updateState({ calibrationLoaded: loaded });
  }

  setDiagnosticResult(result: InterpretedResult) {
    this.updateState({ result, processing: false, error: null });
  }

  setPipelineError(error: string) {
    this.updateState({ error, processing: false });
  }

  resetSession() {
    this.updateState({
      activeModule: null,
      imageUri: null,
      processing: false,
      modelLoaded: false,
      calibrationLoaded: false,
      result: null,
      error: null,
    });
  }
}

export const screeningStore = new ScreeningStore();
