import request from 'request';

class Core {
  constructor(options) {
    // Use global Promise by default
    this.Promise = options.Promise || Promise;
  }

  checkValidConfig(fields, config) {
    fields.forEach((field) => {
      if (!config[field]) {
        throw new Error(`${this.name}: No ${field} provided`);
      }
    });
  }

  request(options) {
    return new this.Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          reject(error);
        } else if (response.statusCode === 200) {
          resolve(body);
        } else {
          reject(response);
        }
      });
    });
  }
}

export default Core;
