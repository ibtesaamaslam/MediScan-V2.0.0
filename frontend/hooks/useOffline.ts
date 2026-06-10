import { useState, useEffect, useCallback } from 'react';
import { SyncService } from '../services/sync/SyncService';
import { QueueService } from '../services/sync/QueueService';
import { ScreeningResult } from '../types/Screening';

export function useOffline() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [queuedRecords, setQueuedRecords] = useState<ScreeningResult[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncMetrics, setSyncMetrics] = useState({
    processed: 0,
    failed: 0,
  });

  const checkConnectivity = useCallback(async () => {
    // Tests connection to server
    const connected = await SyncService.pingUplink();
    setIsOnline(connected);
    return connected;
  }, []);

  const refreshQueue = useCallback(async () => {
    const records = await QueueService.getQueuedRecords();
    setQueuedRecords(records);
  }, []);

  const addToSyncQueue = useCallback(async (record: ScreeningResult) => {
    await QueueService.queueRecord(record);
    await refreshQueue();
  }, [refreshQueue]);

  const triggerManualSync = useCallback(async () => {
    setIsSyncing(true);
    try {
      const result = await SyncService.runDeltaSync();
      setSyncMetrics({
        processed: result.processed,
        failed: result.failed,
      });
      await refreshQueue();
      await checkConnectivity();
      return result;
    } catch (error) {
      console.error('[useOffline] Sync failure:', error);
      return { processed: 0, failed: queuedRecords.length, status: 'dormant' as const };
    } finally {
      setIsSyncing(false);
    }
  }, [queuedRecords.length, refreshQueue, checkConnectivity]);

  useEffect(() => {
    checkConnectivity();
    refreshQueue();
    // Simulate periodic network heartbeat checks
    const timer = setInterval(() => {
      checkConnectivity();
    }, 15000);
    return () => clearInterval(timer);
  }, [checkConnectivity, refreshQueue]);

  return {
    isOnline,
    queuedRecords,
    isSyncing,
    syncMetrics,
    checkConnectivity,
    refreshQueue,
    addToSyncQueue,
    triggerManualSync,
  };
}
