// backend-api/core/systemState.js

class SystemState {
  constructor() {
    this.state = {
      scanner: {},
      signals: [],
      lastUpdate: null,
    };
  }

  updateScanner(data) {
    this.state.scanner = data;
    this.state.lastUpdate = Date.now();
  }

  addSignal(signal) {
    this.state.signals.push({
      ...signal,
      timestamp: Date.now(),
    });
  }

  getState() {
    return this.state;
  }
}

const systemState = new SystemState();
export default systemState;

