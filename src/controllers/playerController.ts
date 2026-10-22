import { Request, Response } from "express";
import { PlayerService } from "../services/playerService";
import { PlayerRepository } from "../repository/playerRepository";

const playerService = new PlayerService(new PlayerRepository());

export async function createPlayer(req: Request, res: Response): Promise<void> {
  try {
    const { username } = req.body;

    if (typeof username !== "string" || username.trim().length === 0) {
      res.status(400).json({
        error: "Username is required",
      });
      return;
    }

    const player = await playerService.createPlayer(username.trim());

    res.status(201).json({ player });
  } catch (error) {
    console.error("Failed to create player:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      res.status(409).json({
        error: "A player with this username already exists",
      });
      return;
    }

    res.status(500).json({
      error: "Failed to create player",
    });
  }
}
