import db from "../database/database";
import { Player } from "../types/wallet";

export class PlayerRepository {
  async createPlayer(username: string): Promise<Player> {
    return db.one(
      `INSERT INTO wallet.players (username)
       VALUES ($1)
       RETURNING *`,
      [username],
    );
  }

  async findPlayerById(id: string): Promise<Player | null> {
    return db.oneOrNone(
      `SELECT *
       FROM wallet.players
       WHERE id = $1`,
      [id],
    );
  }

  async createPlayerWithWallet(username: string): Promise<Player> {
    return db.tx(async (transaction) => {
      const player = await transaction.one(
        `INSERT INTO wallet.players (username)
         VALUES ($1)
         RETURNING *`,
        [username],
      );

      await transaction.none(
        `INSERT INTO wallet.wallets (player_id)
         VALUES ($1)`,
        [player.id],
      );

      return player;
    });
  }
}
