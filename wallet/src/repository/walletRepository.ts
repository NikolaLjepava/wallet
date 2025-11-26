import db from "../database/database";
import { Wallet } from "../types/wallet";
import { SQL } from '../database/sql';

export class WalletRepository {
  async createWallet(playerId: string): Promise<Wallet> {
    return db.one(
      SQL.createWallet, [playerId]
    );
  }

  async getWalletByPlayerId(playerId: string): Promise<Wallet | null> {
    return db.oneOrNone(
      SQL.getWalletByPlayerId,
      [playerId]
    );
  }

  // async processDeposit(playerId: string, sessionId: string, amount: number): Promise<void> {
    
  // }

//   async processWithdrawal(playerId: string, sessionId: string, amount: number): Promise<boolean> {
//     // Withdrawal-specific logic with locking
//   }
}