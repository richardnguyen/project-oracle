// backend-api/core/utils.js

export function validateScannerPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return { success: false, error: "Invalid payload" };
  }
  if (!payload.symbol) {
    return { success: false, error: "Missing symbol" };
  }
  if (!payload.timeframe) {
    return { success: false, error: "Missing timeframe" };
  }

  return { success: true };
}

export function normalizeScannerData(payload) {
  return {
    symbol: payload.symbol.toUpperCase(),
    timeframe: String(payload.timeframe),
    values: payload.values || {},
    raw: payload,
    receivedAt: Date.now(),
  };
}

