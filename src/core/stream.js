import EventEmitter from 'events';

class Stream extends EventEmitter {
  constructor() {
    super();
    this.cache = [];
  }

  start() {
    // Save start date for stream
    this.startDate = new Date();
    // Stop the old stream if there is one
    this.stop();
    // Call a first request
    this.makeRequest();
    // Start setInterval and store id
    this.intervalId = setInterval(this.makeRequest.bind(this), this.interval);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

export default Stream;
