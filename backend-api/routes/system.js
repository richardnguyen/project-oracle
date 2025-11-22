import express from "express";
import systemState from "../core/systemState.js";

const router = express.Router();

// GET /api/system/state
router.get("/state", (req, res) => {
  res.json({
    success: true,
    system: systemState.getState(),
  });
});

// POST /api/system/reset
router.post("/reset", (req, res) => {
  systemState.reset();
  res.json({ success: true, message: "System reset" });
});

export default router;
