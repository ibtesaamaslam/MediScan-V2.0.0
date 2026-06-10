import { ScreeningResult } from '../../types/Screening';

export interface QueuedSyncRecord {
  id: string;
  record: ScreeningResult;
  addedAt: string;
  retryCount: number;
}

let _outboundQueue: QueuedSyncRecord[] = [
  {
    id: 'queued-1',
    record: {
      id: 'mock-q-101',
      moduleType: 'skin',
      conditionName: 'Seborrheic Keratosis Pathology',
      confidence: 0.88,
      severity: 'mild',
      recommendation: 'Monitor regularly. Keep clean.',
      timestamp: '2026-06-09T18:00:00.000Z',
      differentials: ['Melanocytic Naevus']
    },
    addedAt: '2026-06-09T18:02:00.000Z',
    retryCount: 0
  }
];

export class QueueService {
  /**
   * Retrieves all diagnostic screenings waiting for internet sync.
   */
  static async getQueuedRecords(): Promise<ScreeningResult[]> {
    console.log('[QueueService] Pulling active records from local outbound queue...');
    return _outboundQueue.map(item => item.record);
  }

  static async getRawQueue(): Promise<QueuedSyncRecord[]> {
    return [..._outboundQueue];
  }

  /**
   * Queues a newly captured screening result for subsequent synchronization.
   */
  static async queueRecord(record: ScreeningResult): Promise<void> {
    const alreadyExists = _outboundQueue.some(item => item.record.id === record.id);
    if (!alreadyExists) {
      _outboundQueue.push({
        id: `queued-${Math.floor(Math.random() * 10000)}`,
        record: { ...record },
        addedAt: new Date().toISOString(),
        retryCount: 0
      });
      console.log(`[QueueService] Queued record ${record.id} successfully: Local pending stack size = ${_outboundQueue.length}`);
    }
  }

  /**
   * Removes a record from the queue upon successful completion of uplink synchronization.
   */
  static async removeRecordFromQueue(recordId: string): Promise<boolean> {
    const initialLen = _outboundQueue.length;
    _outboundQueue = _outboundQueue.filter(item => item.record.id !== recordId);
    if (_outboundQueue.length < initialLen) {
      console.log(`[QueueService] Dismissed record ${recordId} from outbound queue buffer`);
      return true;
    }
    return false;
  }

  /**
   * Updates retry counts on packet transmission drops
   */
  static async incrementRetryCount(recordId: string): Promise<void> {
    const idx = _outboundQueue.findIndex(item => item.record.id === recordId);
    if (idx !== -1) {
      _outboundQueue[idx].retryCount++;
      console.log(`[QueueService] Synced retry counter incremented for ${recordId}: ${_outboundQueue[idx].retryCount} attempts`);
    }
  }
}
