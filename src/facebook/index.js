import Core from '../core/core';

class Facebook extends Core {
  constructor(config = {}, options = {}) {
    super(options);
    this.name = 'facebook';
    if (!config.accessToken) {
      this.checkValidConfig(['appId', 'appSecret'], config);
    }
    this.auth = {
      appId: config.appId,
      appSecret: config.appSecret,
    };
    this.options = {
      access_token: config.accessToken || `${config.appId}|${config.appSecret}`,
    };
    this.url = 'https://graph.facebook.com';
    this.version = options.version || 'v2.5';
    this.baseApiUrl = `${this.url}/${this.version}`;
  }

  get(url, options = {}) {
    return this.request({
      method: 'GET',
      json: true,
      uri: `${this.baseApiUrl}/${url}`,
      qs: Object.assign(this.options, options),
    });
  }

  post(url, options = {}) {
    return this.request({
      method: 'POST',
      json: true,
      uri: `${this.baseApiUrl}/${url}`,
      form: Object.assign(this.options, options),
    });
  }

  delete(url, options = {}) {
    return this.request({
      method: 'DELETE',
      json: true,
      uri: `${this.baseApiUrl}/${url}`,
      qs: Object.assign(this.options, options),
    });
  }
}

export default Facebook;
