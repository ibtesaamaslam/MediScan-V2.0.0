import { CampSession } from '../services/database/SessionRepository';

// Comm Health Worker Outpost state manager
export interface CHWState {
  currentChwId: string | null;
  locationRegion: string | null;
  activeSession: CampSession | null;
  dailyIntakeGoal: number;
}

type Subscriber = (state: CHWState) => void;

class CHWStore {
  private state: CHWState = {
    currentChwId: 'chw-sarah',
    locationRegion: 'SINDH-02 Punjab Unit',
    activeSession: null,
    dailyIntakeGoal: 30,
  };

  private subscribers: Set<Subscriber> = new Set();

  getState(): CHWState {
    return { ...this.state };
  }

  updateState(updater: Partial<CHWState> | ((state: CHWState) => Partial<CHWState>)): void {
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

  setChwCredentials(chwId: string, location: string) {
    this.updateState({ currentChwId: chwId, locationRegion: location });
  }

  setActiveSession(session: CampSession | null) {
    this.updateState({ activeSession: session });
  }

  setDailyGoal(goal: number) {
    this.updateState({ dailyIntakeGoal: goal });
  }
}

export const chwStore = new CHWStore();
