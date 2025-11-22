import express from "express";
import signalEngine from "../core/signalEngine.js";

const router = express.Router();

// POST /api/signals
router.post("/", (req, res) => {
  const result = signalEngine.updateSignals(req.body);
  res.json(result);
});

// GET /api/signals
router.get("/", (req, res) => {
  res.json({
    success: true,
    signals: signalEngine.getSignals(),
  });
});

export default router;


