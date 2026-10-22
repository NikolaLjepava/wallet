import { PlayerRepository } from "../repository/playerRepository";
import { Player } from "../types/wallet";

export class PlayerService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async createPlayer(username: string): Promise<Player> {
    return this.playerRepository.createPlayerWithWallet(username);
  }

  async getPlayerById(id: string): Promise<Player | null> {
    return this.playerRepository.findPlayerById(id);
  }
}
