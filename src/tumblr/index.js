import isFunction from 'lodash.isfunction';
import Core from '../core/core';
import TumblrStream from './stream';

/**
 * @class Tumblr
 * @description Tumblr class
 * @example
 * const tumblr = new Tumblr({
 *  consumerKey: 'your-consumer-key',
 * });
 *
 * tumblr.get('some-tumblr-route').then((data) => {
 *  console.log(data);
 * });
 */
class Tumblr extends Core {
  /**
   * @constructs Tumblr
   * @description Constructs an instance of Tumblr.
   *
   * @param {object} config - Config of class.
   * @param {string} config.consumerKey - consumerKey of Tumblr app.
   * @param {object} [options] - Options of class.
   *
   */
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

  /**
   * @memberof Tumblr
   * @function get
   * @description Make a get request to tumblr api.
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
      qs: Object.assign({}, this.options, options),
    }, callback);
  }

  /**
   * @memberof Tumblr
   * @function post
   * @description Make a post request to tumblr api.
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
      form: Object.assign({}, this.options, options),
    }, callback);
  }

  /**
   * @memberof Tumblr
   * @function stream
   * @description Create a new tumblr stream.<br />
   *
   * @param  {string} url
   * @param  {Object} [options]
   * @return {TumblrStream} A new tumblr stream.
   */
  stream(url, options) {
    return new TumblrStream(this, url, options);
  }
}

export default Tumblr;
