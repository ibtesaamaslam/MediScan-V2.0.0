import { ScreeningResult } from '../types/Screening';

export interface HistoryState {
  records: ScreeningResult[];
  loading: boolean;
  totalMildCount: number;
  totalModerateCount: number;
  totalUrgentCount: number;
}

type Subscriber = (state: HistoryState) => void;

class HistoryStore {
  private state: HistoryState = {
    records: [],
    loading: false,
    totalMildCount: 0,
    totalModerateCount: 0,
    totalUrgentCount: 0,
  };

  private subscribers: Set<Subscriber> = new Set();

  getState(): HistoryState {
    return { ...this.state };
  }

  updateState(updater: Partial<HistoryState> | ((state: HistoryState) => Partial<HistoryState>)): void {
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

  setLoading(val: boolean) {
    this.updateState({ loading: val });
  }

  setRecords(records: ScreeningResult[]) {
    let mild = 0;
    let moderate = 0;
    let urgent = 0;

    records.forEach((r) => {
      if (r.severity === 'urgent') urgent++;
      else if (r.severity === 'moderate') moderate++;
      else mild++;
    });

    this.updateState({
      records,
      totalMildCount: mild,
      totalModerateCount: moderate,
      totalUrgentCount: urgent,
    });
  }
}

export const historyStore = new HistoryStore();
