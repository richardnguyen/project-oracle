// backend-api/core/signalEngine.js

import systemState from "./systemState.js";

class SignalEngine {
  constructor() {}

  processScannerUpdate(data) {
    const { symbol, values } = data;

    // Basic example logic — replace with real strategy
    let signal = null;

    if (values?.rsi && values.rsi < 30) {
      signal = { type: "BUY", reason: "RSI oversold", symbol };
    }

    if (values?.rsi && values.rsi > 70) {
      signal = { type: "SELL", reason: "RSI overbought", symbol };
    }

    if (signal) {
      systemState.addSignal(signal);
      console.log("New signal:", signal);
    }

    return signal;
  }
}

const signalEngine = new SignalEngine();
export default signalEngine;

import signalEngine from "./signalEngine.js";

// Register subscribers
scannerEngine.subscribe((data) => signalEngine.processScannerUpdate(data));
