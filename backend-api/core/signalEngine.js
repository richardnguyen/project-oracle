// backend-api/core/signalEngine.js

class SignalEngine {
  constructor() {
    this.latest = [];       // holds last known signals
    this.subscribers = [];  // other modules that want signal updates
  }

  // Allow other systems to register for signal updates
  subscribe(fn) {
    if (typeof fn === "function") {
      this.subscribers.push(fn);
    }
  }

  // Main update handler used by /api/signals POST
  updateSignals(signalList) {
    // Validate
    if (!Array.isArray(signalList) || signalList.length === 0) {
      return { success: false, error: "Invalid or empty signal array" };
    }

    this.latest = signalList;

    // Notify all subscribers (logging, UI push modules, AI scoring, etc.)
    this.subscribers.forEach((fn) => {
      try {
        fn(this.latest);
      } catch (err) {
        console.error("Signal subscriber error:", err);
      }
    });

    return {
      success: true,
      count: this.latest.length,
    };
  }

  // Getter for GET /api/signals
  getSignals() {
    return this.latest;
  }
}

const signalEngine = new SignalEngine();
export default signalEngine;

