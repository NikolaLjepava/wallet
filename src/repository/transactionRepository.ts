import db from '../database/database';
import { SQL } from '../database/sql';
import { Transaction } from '../types/wallet';

export class TransactionRepository {
  
  async getTransactionHistory(playerId: string, sessionId?: string): Promise<Transaction[]> {
    if (sessionId) {
      return db.any(SQL.getTransactionsByPlayerAndSession, [playerId, sessionId]);
    } else {
      return db.any(SQL.getTransactionsByPlayer, [playerId]);
    }
  }
}