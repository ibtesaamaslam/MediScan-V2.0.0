// CHW (Community Health Worker) camp session sqlite repository
export interface CampSession {
  id: string;
  chwId: string;
  locationRegion: string;
  startTime: string;
  endTime?: string;
  localRecordsCount: number;
  syncedRecordsCount: number;
}

let _sessions: CampSession[] = [
  {
    id: 'sess-001',
    chwId: 'chw-sarah',
    locationRegion: 'SINDH-02 District Camp',
    startTime: '2026-06-08T09:00:00.000Z',
    endTime: '2026-06-08T17:00:00.000Z',
    localRecordsCount: 24,
    syncedRecordsCount: 24
  },
  {
    id: 'sess-002',
    chwId: 'chw-sarah',
    locationRegion: 'PUNJAB-14 Mobile Unit',
    startTime: '2026-06-09T08:30:00.000Z',
    localRecordsCount: 12,
    syncedRecordsCount: 0 // Waiting for uplink
  }
];

export class SessionRepository {
  static async getAllSessions(): Promise<CampSession[]> {
    console.log('[SessionRepository] Retrieving active and closed camp session timeline records...');
    return [..._sessions];
  }

  static async findActiveSession(): Promise<CampSession | null> {
    const active = _sessions.find((s) => !s.endTime);
    return active ? { ...active } : null;
  }

  static async createSession(chwId: string, locationRegion: string): Promise<CampSession> {
    const active = await this.findActiveSession();
    if (active) {
      console.log(`[SessionRepository] Warning: Pre-closing un-closed session ${active.id} automatically`);
      await this.endSession(active.id);
    }

    const newSession: CampSession = {
      id: `sess-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      chwId,
      locationRegion,
      startTime: new Date().toISOString(),
      localRecordsCount: 0,
      syncedRecordsCount: 0
    };

    _sessions.unshift(newSession);
    console.log(`[SessionRepository] Spawned new active camp session frame: ${newSession.id}`);
    return newSession;
  }

  static async endSession(id: string): Promise<void> {
    const idx = _sessions.findIndex((s) => s.id === id);
    if (idx !== -1) {
      _sessions[idx] = {
        ..._sessions[idx],
        endTime: new Date().toISOString()
      };
      console.log(`[SessionRepository] Closed session frame ${id} successfully`);
    }
  }

  static async incrementRecordCount(id: string): Promise<void> {
    const idx = _sessions.findIndex((s) => s.id === id);
    if (idx !== -1) {
      _sessions[idx].localRecordsCount++;
    }
  }

  static async markAsSynced(id: string, count: number): Promise<void> {
    const idx = _sessions.findIndex((s) => s.id === id);
    if (idx !== -1) {
      _sessions[idx].syncedRecordsCount = count;
    }
  }
}
