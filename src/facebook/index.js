import isFunction from 'lodash.isfunction';
import Core from '../core/core';

/**
 * @class Facebook
 * @description Facebook class
 * @example
 * const facebook = new Facebook({
 *  appId: 'your-app-id',
 *  appSecret: 'your-app-secret',
 * });
 *
 * facebook.get('some-facebook-id').then((data) => {
 *  console.log(data);
 * });
 */
class Facebook extends Core {

  /**
   * @constructs Facebook
   * @description Constructs an instance of Facebook.
   *
   * @param {object} config - Config of class.
   * @param {string} config.appId - AppId of Facebook app.
   * @param {string} config.appSecret - appSecret of Facebook app.
   * @param {object} [options] - Options of class.
   *
   */
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

  /**
   * @memberof Facebook
   * @function get
   * @description Make a get request to facebook api.
   *
   * @param {string} url - Url of route.
   * @param {object} [options] - Options to pass in request.
   * @param {function} [callback] - Callback to call when the request finish.
   * @return {promise}
   */
  get(url, options = {}, callback) {
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

  /**
   * @memberof Facebook
   * @function post
   * @description Make a post request to facebook api.
   *
   * @param {string} url - Url of route.
   * @param {object} [options] - Options to pass in request.
   * @param {function} [callback] - Callback to call when the request finish.
   * @return {promise}
   */
  post(url, options = {}, callback) {
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

  /**
   * @memberof Facebook
   * @function delete
   * @description Make a delete request to facebook api.
   *
   * @param {string} url - Url of route.
   * @param {object} [options] - Options to pass in request.
   * @param {function} [callback] - Callback to call when the request finish.
   * @return {promise}
   */
  delete(url, options = {}, callback) {
    if (isFunction(options)) {
      callback = options;
      options = {};
    }
    return this.request({
      method: 'DELETE',
      json: true,
      uri: `${this.baseApiUrl}/${url}`,
      qs: Object.assign(this.options, options),
    }, callback);
  }
}

export default Facebook;
