import isFunction from 'lodash.isfunction';
import Core from '../core/core';

/**
 * @class Tumblr
 * @description Tumblr class
 * @example
 * const facebook = new Tumblr({
 *  appId: 'your-app-id',
 *  appSecret: 'your-app-secret',
 * });
 *
 * facebook.get('some-facebook-id').then((data) => {
 *  console.log(data);
 * });
 */
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

  get(url, options, callback) {
    if (isFunction(options)) {
      callback = options;
      options = {};
    }
    return this.request({
      method: 'GET',
      json: true,
      uri: `${this.baseApiUrl}/${url}`,
      qs: Object.assign(this.options, options),
    }, callback);
  }

  post(url, options, callback) {
    if (isFunction(options)) {
      callback = options;
      options = {};
    }
    return this.request({
      method: 'POST',
      json: true,
      uri: `${this.baseApiUrl}/${url}`,
      form: Object.assign(this.options, options),
    }, callback);
  }
}

export default Tumblr;
