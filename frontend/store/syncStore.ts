// Outbound Sync Queue State Manager
export interface SyncState {
  isOnline: boolean;
  isSyncing: boolean;
  pendingRecordsCount: number;
  lastSuccessfulSyncAt: string | null;
  networkLatencyMs: number;
}

type Subscriber = (state: SyncState) => void;

class SyncStore {
  private state: SyncState = {
    isOnline: true,
    isSyncing: false,
    pendingRecordsCount: 1,
    lastSuccessfulSyncAt: null,
    networkLatencyMs: 44,
  };

  private subscribers: Set<Subscriber> = new Set();

  getState(): SyncState {
    return { ...this.state };
  }

  updateState(updater: Partial<SyncState> | ((state: SyncState) => Partial<SyncState>)): void {
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

  setOnlineStatus(online: boolean) {
    this.updateState({ isOnline: online });
  }

  setSyncing(syncing: boolean) {
    this.updateState({ isSyncing: syncing });
  }

  updatePendingCount(count: number) {
    this.updateState({ pendingRecordsCount: count });
  }

  setSyncCompleted() {
    this.updateState({
      isSyncing: false,
      lastSuccessfulSyncAt: new Date().toISOString(),
      pendingRecordsCount: 0,
    });
  }

  setLatency(ms: number) {
    this.updateState({ networkLatencyMs: ms });
  }
}

export const syncStore = new SyncStore();
