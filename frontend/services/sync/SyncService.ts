import { ScreeningResult } from '../../types/Screening';
import { QueueService } from './QueueService';

export class SyncService {
  private static isSyncing: boolean = false;
  private static lastSuccessfullySyncedAt: string | null = null;

  /**
   * Evaluates if regional medical servers are reachable (uplink handshake test)
   */
  static async pingUplink(host: string = 'https://regional-clinic.org/api'): Promise<boolean> {
    console.log(`[SyncService] Emitting heartbeat pulse to remote clinical node: ${host}`);
    await new Promise((resolve) => setTimeout(resolve, 150));
    const randomReach = Math.random() < 0.85; // 85% success probability in mock environment
    return randomReach;
  }

  /**
   * Syncs queued local clinical cases with remote servers
   */
  static async runDeltaSync(host: string = 'https://regional-clinic.org/api'): Promise<{
    processed: number;
    failed: number;
    status: 'success' | 'partial' | 'dormant';
  }> {
    if (this.isSyncing) {
      console.log('[SyncService] Sync sequence currently locked by another async dispatch context');
      return { processed: 0, failed: 0, status: 'dormant' };
    }

    this.isSyncing = true;
    console.log('[SyncService] Loading active clinical screening queue for delta sync processing...');
    
    const queue = await QueueService.getQueuedRecords();
    if (queue.length === 0) {
      console.log('[SyncService] Local pipeline fully synced. No records pending upload.');
      this.isSyncing = false;
      return { processed: 0, failed: 0, status: 'success' };
    }

    const isHealty = await this.pingUplink(host);
    if (!isHealty) {
      console.warn('[SyncService] Synchronisation aborted: Clinic uplink offline or packet loss too high');
      this.isSyncing = false;
      return { processed: 0, failed: queue.length, status: 'dormant' };
    }

    let processedCount = 0;
    let failedCount = 0;

    for (const record of queue) {
      try {
        console.log(`[SyncService] Uploading clinical telemetry record [ID: ${record.id}] to hospital ledger...`);
        // Simulating packet transport delay
        await new Promise((resolve) => setTimeout(resolve, 200));
        
        // Mark as synced from queue
        await QueueService.removeRecordFromQueue(record.id);
        processedCount++;
      } catch (err) {
        console.error(`[SyncService] Failed syncing record [ID: ${record.id}]`, err);
        failedCount++;
      }
    }

    this.lastSuccessfullySyncedAt = new Date().toISOString();
    this.isSyncing = false;

    return {
      processed: processedCount,
      failed: failedCount,
      status: failedCount === 0 ? 'success' : 'partial'
    };
  }

  static getSyncState() {
    return {
      isSyncing: this.isSyncing,
      lastSuccessfullySyncedAt: this.lastSuccessfullySyncedAt,
      networkMode: 'automatic'
    };
  }
}
