import db from '../database/database';
import { SQL } from '../database/sql';
import { Session } from '../types/wallet';

export class SessionRepository {
  async createSession(playerId: string): Promise<Session> {
    return db.one(SQL.createSession, [playerId]);
  }
}