import { SessionRepository } from "../repository/sessionRepository";
import { TransactionRepository } from "../repository/transactionRepository";
import { WalletRepository } from "../repository/walletRepository";

export class WalletService {
  constructor(
    private walletRepo: WalletRepository,
    private transactionRepo: TransactionRepository, 
    private sessionRepo: SessionRepository
  ) {}

  async createWallet(playerId: string) { /*...*/ }
  async createSession(playerId: string) { /*...*/ }
  async withdraw(playerId: string, sessionId: string, amount: number) { /*...*/ }
  async deposit(playerId: string, sessionId: string, amount: number) { /*...*/ }
  async getTransactionHistory(playerId: string, sessionId?: string) { /*...*/ }
}