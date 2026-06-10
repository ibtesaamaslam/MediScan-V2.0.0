// Settings Configuration State Wrapper
export interface SettingsState {
  currentLocale: 'en' | 'ur' | 'hi' | 'sw';
  serverEndpoint: string;
  autoSync: boolean;
  biometricConsentRequired: boolean;
  hardwareAcceleration: boolean;
}

type Subscriber = (state: SettingsState) => void;

class SettingsStore {
  private state: SettingsState = {
    currentLocale: 'en',
    serverEndpoint: 'https://regional-clinic.org/api',
    autoSync: true,
    biometricConsentRequired: true,
    hardwareAcceleration: true,
  };

  private subscribers: Set<Subscriber> = new Set();

  getState(): SettingsState {
    return { ...this.state };
  }

  updateState(updater: Partial<SettingsState> | ((state: SettingsState) => Partial<SettingsState>)): void {
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

  setLocale(locale: 'en' | 'ur' | 'hi' | 'sw') {
    this.updateState({ currentLocale: locale });
  }

  setEndpoint(endpoint: string) {
    this.updateState({ serverEndpoint: endpoint });
  }

  setAutoSync(val: boolean) {
    this.updateState({ autoSync: val });
  }

  setBiometricConsent(val: boolean) {
    this.updateState({ biometricConsentRequired: val });
  }

  setHardwareAcceleration(val: boolean) {
    this.updateState({ hardwareAcceleration: val });
  }
}

export const settingsStore = new SettingsStore();
