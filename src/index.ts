import express from "express";
import { config } from "./config/env";
import walletRoutes from "./routes/walletRoutes";
import playerRoutes from "./routes/playerRoutes";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", walletRoutes);
app.use("/api", playerRoutes);

app.listen(config.port, () => {
  console.log(`Wallet API listening on port ${config.port}`);
});
