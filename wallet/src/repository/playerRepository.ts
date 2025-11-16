import db from '../database/database';
import { Player } from '../types/wallet';

export class PlayerRepository {
  async createPlayer(username: string): Promise<Player> {
    return db.one(
      'INSERT INTO wallet.players (username) VALUES ($1) RETURNING *',
      [username]
    );
  }

  async findPlayerById(id: string): Promise<Player | null> {
    return db.oneOrNone(
      'SELECT * FROM wallet.players WHERE id = $1',
      [id]
    );
  }
}