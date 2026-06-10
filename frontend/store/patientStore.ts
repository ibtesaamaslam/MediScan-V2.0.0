import { PatientRecord } from '../services/database/PatientRepository';

// Patient Registration and Biometric Consent State Manager
export interface PatientState {
  registeredPatientsCount: number;
  selectedPatientIdHash: string | null;
  activeConsentGiven: boolean;
  isSaving: boolean;
  patientList: PatientRecord[];
}

type Subscriber = (state: PatientState) => void;

class PatientStore {
  private state: PatientState = {
    registeredPatientsCount: 0,
    selectedPatientIdHash: null,
    activeConsentGiven: false,
    isSaving: false,
    patientList: [],
  };

  private subscribers: Set<Subscriber> = new Set();

  getState(): PatientState {
    return { ...this.state };
  }

  updateState(updater: Partial<PatientState> | ((state: PatientState) => Partial<PatientState>)): void {
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

  setSaving(val: boolean) {
    this.updateState({ isSaving: val });
  }

  selectPatient(hash: string | null) {
    this.updateState({ selectedPatientIdHash: hash, activeConsentGiven: false });
  }

  giveConsent(val: boolean) {
    this.updateState({ activeConsentGiven: val });
  }

  syncRegisteredCount(count: number) {
    this.updateState({ registeredPatientsCount: count });
  }

  setPatientList(patients: PatientRecord[]) {
    this.updateState({ patientList: patients, registeredPatientsCount: patients.length });
  }
}

export const patientStore = new PatientStore();
