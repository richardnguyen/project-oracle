// backend-api/core/scannerEngine.js

import systemState from "./systemState.js";
import { validateScannerPayload, normalizeScannerData } from "./utils.js";

class ScannerEngine {
  constructor() {
    this.subscribers = [];
  }

  // Register sub-systems (signals, logging, etc.)
  subscribe(fn) {
    this.subscribers.push(fn);
  }

  // Main handler called by the route POST /api/scanner/state
  handleScannerUpdate(payload) {
    // 1. Validate incoming data
    const valid = validateScannerPayload(payload);
    if (!valid.success) {
      return { success: false, error: valid.error };
    }

    // 2. Normalize (symbols, casing, timeframes)
    const normalized = normalizeScannerData(payload);

    // 3. Update global system state
    systemState.updateScanner(normalized);

    // 4. Broadcast to all subscribed modules
    this.subscribers.forEach((fn) => {
      try {
        fn(normalized);
      } catch (err) {
        console.error("Subscriber error:", err);
      }
    });

    // 5. Return unified response
    return {
      success: true,
      message: "Scanner update processed",
      data: normalized,
    };
  }
}

const scannerEngine = new ScannerEngine();
export default scannerEngine;

