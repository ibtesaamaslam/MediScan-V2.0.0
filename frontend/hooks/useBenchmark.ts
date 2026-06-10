import { useState, useCallback, useEffect } from 'react';
import { BenchmarkService, BenchmarkReport } from '../services/benchmark/BenchmarkService';

export function useBenchmark() {
  const [reports, setReports] = useState<BenchmarkReport[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeReport, setActiveReport] = useState<BenchmarkReport | null>(null);

  const fetchTrends = useCallback(async () => {
    const trends = await BenchmarkService.getPerformanceTrends();
    setReports(trends);
  }, []);

  const runDiagnosticAudit = useCallback(async () => {
    setIsRunning(true);
    try {
      const report = await BenchmarkService.runPerformanceAudit();
      setActiveReport(report);
      await fetchTrends();
      return report;
    } catch (err) {
      console.error('[useBenchmark] Benchmark execution failed:', err);
      return null;
    } finally {
      setIsRunning(false);
    }
  }, [fetchTrends]);

  useEffect(() => {
    fetchTrends();
  }, [fetchTrends]);

  return {
    reports,
    isRunning,
    activeReport,
    runDiagnosticAudit,
    refreshTrendLogs: fetchTrends,
  };
}
