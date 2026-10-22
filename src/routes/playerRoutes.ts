import { Router } from "express";
import { createPlayer } from "../controllers/playerController";

const router = Router();

router.post("/players", createPlayer);

export default router;
