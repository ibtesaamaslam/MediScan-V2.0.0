import { DemographicStat } from '../services/analytics/AnalyticsService';

// Offline Metrics Compilation state manager
export interface AnalyticsState {
  grandTotalScreenings: number;
  distribution: DemographicStat[];
  urgentRatio: number;
  cpuThermalState: string;
  ramUsageMB: number;
  benchmarkScore: number; // in Milliseconds of delay
}

type Subscriber = (state: AnalyticsState) => void;

class AnalyticsStore {
  private state: AnalyticsState = {
    grandTotalScreenings: 0,
    distribution: [],
    urgentRatio: 0,
    cpuThermalState: 'cool',
    ramUsageMB: 38.4,
    benchmarkScore: 120,
  };

  private subscribers: Set<Subscriber> = new Set();

  getState(): AnalyticsState {
    return { ...this.state };
  }

  updateState(updater: Partial<AnalyticsState> | ((state: AnalyticsState) => Partial<AnalyticsState>)): void {
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

  setMetrics(total: number, dist: DemographicStat[], urgentRatio: number) {
    this.updateState({ grandTotalScreenings: total, distribution: dist, urgentRatio });
  }

  setPerformanceSpecs(cpu: string, ram: number, score: number) {
    this.updateState({ cpuThermalState: cpu, ramUsageMB: ram, benchmarkScore: score });
  }
}

export const analyticsStore = new AnalyticsStore();
