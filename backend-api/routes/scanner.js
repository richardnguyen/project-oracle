import express from "express";
const router = express.Router();

let scannerState = {};

// POST /api/scanner/state
router.post("/state", (req, res) => {
  scannerState = req.body;
  res.json({ success: true });
});

// GET /api/scanner/state
router.get("/state", (req, res) => {
  res.json(scannerState);
});

export default router;

