// clean placeholder backend
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from "config";

import signalsRoute from "./routes/signals.js";
import scannerRoute from "./routes/scanner.js";
import systemRoute from "./routes/system.js";

const app = express();
const PORT = process.env.PORT || config.get("port");
const API_KEY = config.get("apiKey");

// -------- MIDDLEWARE --------
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan(config.get("logLevel")));

// -------- API KEY CHECK --------
app.use((req, res, next) => {
  const key = req.headers["x-api-key"];
  if (!key || key !== API_KEY) {
    return res.status(401).json({ error: "Unauthorized - invalid API key" });
  }
  next();
});

// -------- ROUTES --------
app.use("/api/signals", signalsRoute);
app.use("/api/scanner", scannerRoute);
app.use("/api/system", systemRoute);

// -------- START --------
app.listen(PORT, () =>
  console.log(`🚀 Backend API running on port ${PORT}`)
);
