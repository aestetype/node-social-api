import isFunction from 'lodash.isfunction';
import Core from '../core/core';

/**
 * @class Instagram
 * @description Instagram class
 * @example
 * const instagram = new Instagram({
 *  clientId: 'your-client-id',
 *  accessToken: 'your-access-token',
 * });
 *
 * instagram.get('some-instagram-route').then((data) => {
 *  console.log(data);
 * });
 */
class Instagram extends Core {
  /**
   * @constructs Instagram
   * @description Constructs an instance of Instagram.
   *
   * @param {object} config - Config of class.
   * @param {string} config.clientId - clientId of Instagram app.
   * @param {string} config.accessToken - appSecret of Instagram app.
   * @param {object} [options] - Options of class.
   *
   */
  constructor(config = {}, options = {}) {
    super(options);
    this.name = 'instagram';
    this.checkValidConfig(['clientId', 'accessToken'], config);
    this.options = {
      client_id: config.clientId,
      access_token: config.accessToken,
    };
    this.url = 'https://api.instagram.com';
    this.version = options.version || 'v1';
    this.baseApiUrl = `${this.url}/${this.version}`;
  }

  /**
   * @memberof Instagram
   * @function get
   * @description Make a get request to instagram api.
   *
   * @param {string} url - Url of route.
   * @param {object} [options] - Options to pass in request.
   * @param {function} [callback] - Callback to call when the request finish.
   * @return {promise}
   */
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

  /**
   * @memberof Instagram
   * @function post
   * @description Make a post request to instagram api.
   *
   * @param {string} url - Url of route.
   * @param {object} [options] - Options to pass in request.
   * @param {function} [callback] - Callback to call when the request finish.
   * @return {promise}
   */
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

  /**
   * @memberof Instagram
   * @function delete
   * @description Make a delete request to instagram api.
   *
   * @param {string} url - Url of route.
   * @param {object} [options] - Options to pass in request.
   * @param {function} [callback] - Callback to call when the request finish.
   * @return {promise}
   */
  delete(url, options, callback) {
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

export default Instagram;
