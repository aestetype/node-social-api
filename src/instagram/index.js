import Core from '../core/core';

class Instagram extends Core {
  constructor(config = {}, options = {}) {
    super(options);
    this.name = 'Instagram';
    this.checkValidConfig(['clientId', 'accessToken'], config);
    this.options = {
      client_id: config.clientId,
      access_token: config.accessToken,
    };
    this.url = 'https://api.instagram.com';
    this.version = options.version || 'v1';
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

  delete(url, options) {
    return this.request({
      method: 'DELETE',
      json: true,
      uri: `${this.baseApiUrl}/${url}`,
      qs: Object.assign(this.options, options),
    });
  }
}

export default Instagram;
