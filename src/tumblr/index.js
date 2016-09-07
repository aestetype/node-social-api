import Core from '../core/core';

class Tumblr extends Core {
  constructor(config = {}, options = {}) {
    super(options);
    this.name = 'tumblr';
    this.checkValidConfig(['consumerKey'], config);
    this.options = {
      api_key: config.consumerKey,
    };
    this.url = 'https://api.tumblr.com';
    this.version = options.version || 'v2';
    this.baseApiUrl = `${this.url}/${this.version}`;
  }

  get(url, options) {
    return this.request({
      method: 'GET',
      json: true,
      uri: `${this.baseApiUrl}/${url}`,
      qs: Object.assign(this.options, options),
    });
  }

  post(url, options) {
    return this.request({
      method: 'POST',
      json: true,
      uri: `${this.baseApiUrl}/${url}`,
      form: Object.assign(this.options, options),
    });
  }
}

export default Tumblr;
