import * as fs from "fs";
import * as path from "path";

const readSqlFile = (filePath: string): string => {
  return fs.readFileSync(path.join(__dirname, "sql", filePath), "utf8");
};

export const SQL = {
  createPlayer: readSqlFile("createPlayer.sql"),
  createSession: readSqlFile("createSession.sql"),
  createWallet: readSqlFile("createWallet.sql"),
  getPlayerById: readSqlFile("getPlayerById.sql"),
  getWalletByPlayerId: readSqlFile("getWalletByPlayerId.sql"),
  getSessionById: readSqlFile("getSessionById.sql"),
  getTransactionsByPlayer: readSqlFile("getTransactionByPlayer.sql"),
  getTransactionsByPlayerAndSession: readSqlFile(
    "getTransactionsByPlayerAndSession.sql",
  ),
} as const;
