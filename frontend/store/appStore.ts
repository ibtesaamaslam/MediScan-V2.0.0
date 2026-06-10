// Global Application State Manager
export interface AppState {
  isInitialized: boolean;
  activeScreen: string;
  theme: 'dark' | 'light';
  clinicalRole: 'CHW' | 'Clinician' | 'Admin';
}

type Subscriber = (state: AppState) => void;

class AppStore {
  private state: AppState = {
    isInitialized: true,
    activeScreen: 'Home',
    theme: 'dark',
    clinicalRole: 'CHW',
  };

  private subscribers: Set<Subscriber> = new Set();

  getState(): AppState {
    return { ...this.state };
  }

  updateState(updater: Partial<AppState> | ((state: AppState) => Partial<AppState>)): void {
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

  setInitialized(val: boolean) {
    this.updateState({ isInitialized: val });
  }

  setScreen(screen: string) {
    this.updateState({ activeScreen: screen });
  }

  setRole(role: 'CHW' | 'Clinician' | 'Admin') {
    this.updateState({ clinicalRole: role });
  }

  toggleTheme() {
    this.updateState((prev) => ({ theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  }
}

export const appStore = new AppStore();
