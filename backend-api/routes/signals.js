import express from "express";
const router = express.Router();

let latestSignals = [];   // stored in memory for now

// POST /api/signals
router.post("/", (req, res) => {
  const data = req.body;

  if (!data || data.length === 0) {
    return res.status(400).json({ error: "No signals provided" });
  }

  latestSignals = data;
  return res.json({ success: true });
});

// GET /api/signals
router.get("/", (req, res) => {
  res.json(latestSignals);
});

export default router;

