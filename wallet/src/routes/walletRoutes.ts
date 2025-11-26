import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { WalletService } from '../services/walletService';
import { WalletRepository } from '../repository/walletRepository';
import { SessionRepository } from '../repository/sessionRepository';
import { TransactionRepository } from '../repository/transactionRepository';

const router = Router();

const walletRepo = new WalletRepository();
const sessionRepo = new SessionRepository();
const transactionRepo = new TransactionRepository();
const walletService = new WalletService(walletRepo, transactionRepo, sessionRepo);


router.post('/wallets', authMiddleware, async (req, res) => {
  try {
    const { playerId } = req.body;
    
    if (!playerId) {
      return res.status(400).json({ error: 'playerId is required' });
    }

    const wallet = await walletService.createWallet(playerId);
    res.status(201).json(wallet);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});


router.post('/sessions', authMiddleware, async (req, res) => {
  try {
    const { playerId } = req.body;
    
    if (!playerId) {
      return res.status(400).json({ error: 'playerId is required' });
    }

    const session = await walletService.createSession(playerId);
    res.status(201).json(session);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

router.post('/transactions/withdraw', authMiddleware, async (req, res) => {
  try {
    const { playerId, sessionId, amount } = req.body;
    
    if (!playerId || !sessionId || !amount) {
      return res.status(400).json({ 
        error: 'playerId, sessionId, and amount are required' 
      });
    }

    await walletService.withdraw(playerId, sessionId, amount);
    res.status(200).json({ message: 'Withdrawal successful' });
  } catch (error) {
    if (error instanceof Error) {
      const statusCode = error.message.includes('Insufficient') ? 400 : 500;
      res.status(statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

router.post('/transactions/deposit', authMiddleware, async (req, res) => {
  try {
    const { playerId, sessionId, amount } = req.body;
    
    if (!playerId || !sessionId || !amount) {
      return res.status(400).json({ 
        error: 'playerId, sessionId, and amount are required' 
      });
    }

    await walletService.deposit(playerId, sessionId, amount);
    res.status(200).json({ message: 'Deposit successful' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});


router.get('/transactions/history', authMiddleware, async (req, res) => {
  try {
    const { playerId, sessionId } = req.query;
    
    if (!playerId) {
      return res.status(400).json({ error: 'playerId is required' });
    }

    const history = await walletService.getTransactionHistory(
      playerId as string, 
      sessionId as string
    );
    res.status(200).json(history);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

export default router;