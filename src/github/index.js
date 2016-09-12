import isFunction from 'lodash.isfunction';
import Core from '../core/core';

/**
 * @class Github
 * @description Github class
 * @example
 * const github = new Github({
 *  accessToken: 'your-access-token',
 * });
 *
 * github.get('some-github-route').then((data) => {
 *  console.log(data);
 * });
 */
class Github extends Core {

  /**
   * @constructs Github
   * @description Constructs an instance of Github.
   *
   * @param {object} config - Config of class.
   * @param {string} config.accessToken - accessToken of Github.
   * @param {string} [config.userAgent] - User-Agent header for requests.
   * @param {object} [options] - Options of class.
   *
   */
  constructor(config = {}, options = {}) {
    super(options);
    this.name = 'github';
    if (!config.accessToken) {
      this.checkValidConfig(['accessToken'], config);
    }
    this.options = {
      access_token: config.accessToken,
    };
    this.headers = {
      'User-Agent': config.userAgent ? config.userAgent : 'node-social-api',
    };
    this.url = 'https://api.github.com';
    this.baseApiUrl = this.url;
  }

  /**
   * @memberof Github
   * @function get
   * @description Make a get request to Github api.
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
      headers: this.headers,
      uri: `${this.baseApiUrl}/${url}`,
      qs: Object.assign(this.options, options),
    }, callback);
  }

  /**
   * @memberof Github
   * @function post
   * @description Make a post request to Github api.
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
      headers: this.headers,
      uri: `${this.baseApiUrl}/${url}`,
      form: Object.assign(this.options, options),
    }, callback);
  }

  /**
   * @memberof Github
   * @function delete
   * @description Make a delete request to github api.
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
      headers: this.headers,
      uri: `${this.baseApiUrl}/${url}`,
      qs: Object.assign(this.options, options),
    }, callback);
  }
}

export default Github;
