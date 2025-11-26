import * as fs from 'fs';
import * as path from 'path';

const readSqlFile = (filePath: string): string => {
  return fs.readFileSync(path.join(__dirname, filePath), 'utf8');
};

export const SQL = {
  createPlayer: readSqlFile('createPlayer.sql'),
  getPlayerById: readSqlFile('getPlayerById.sql'),
  createWallet: readSqlFile('createWallet.sql'),
  getWalletByPlayerId: readSqlFile('getWalletByPlayerId.sql'),
  createSession: readSqlFile('createSession.sql'),
  getSessionById: readSqlFile('getSessionById.sql'),
  getTransactionsByPlayer: readSqlFile('getTransactionsByPlayer.sql'),
  getTransactionsByPlayerAndSession: readSqlFile('getTransactionsByPlayerAndSession.sql'),
} as const;