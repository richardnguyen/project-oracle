import express from "express";
import scannerEngine from "../core/scannerEngine.js";

const router = express.Router();

// POST /api/scanner/state
router.post("/state", (req, res) => {
  const result = scannerEngine.handleScannerUpdate(req.body);
  res.json(result);
});

// GET /api/scanner/state
router.get("/state", (req, res) => {
  res.json({
    success: true,
    state: scannerEngine.state,
  });
});

export default router;
