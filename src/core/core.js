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

  request(options, callback) {
    return new this.Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          if (callback) {
            callback(error);
          } else {
            reject(error);
          }
        } else if (response.statusCode === 200) {
          if (callback) {
            callback(null, body);
          } else {
            resolve(body);
          }
        } else if (callback) {
          callback(response);
        } else {
          reject(response);
        }
      });
    });
  }
}

export default Core;
