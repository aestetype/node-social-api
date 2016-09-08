import isFunction from 'lodash.isfunction';
import Core from '../core/core';

/**
 * @class Twitter
 * @description Twitter class
 * @example
 * const twitter = new Twitter({
 *  consumerKey: 'your-app-consumer-key',
 *  consumerSecret: 'your-app-consumer-secret',
 *  accessToken: 'your-app-access-token',
 *  accessTokenSecret: 'your-app-access-token-secret',
 * });
 *
 * twitter.get('some-twitter-route').then((data) => {
 *  console.log(data);
 * });
 */
class Twitter extends Core {
  /**
   * @constructs Twitter
   * @description Constructs an instance of Twitter.
   *
   * @param {object} config - Config of class.
   * @param {string} config.consumerKey - consumerKey of Twitter app.
   * @param {string} config.consumerSecret - consumerSecret of Twitter app.
   * @param {string} config.accessToken - accessToken of Twitter app.
   * @param {string} config.accessTokenSecret - accessTokenSecret of Twitter app.
   * @param {object} [options] - Options of class.
   *
   */
  constructor(config = {}, options = {}) {
    super(options);
    this.name = 'twitter';
    this.checkValidConfig(
      ['consumerKey', 'consumerSecret', 'accessToken', 'accessTokenSecret'],
      config
    );
    this.oauth = {
      consumer_key: config.consumerKey,
      consumer_secret: config.consumerSecret,
      token: config.accessToken,
      token_secret: config.accessTokenSecret,
    };
    this.url = 'https://api.twitter.com';
    this.version = options.version || '1.1';
    this.baseApiUrl = `${this.url}/${this.version}`;
  }

  /**
   * @memberof Twitter
   * @function get
   * @description Make a get request to twitter api.
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
      uri: `${this.baseApiUrl}/${url}.json`,
      oauth: this.oauth,
      qs: options,
    }, callback);
  }

  /**
   * @memberof Twitter
   * @function post
   * @description Make a post request to twitter api.
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
      uri: `${this.baseApiUrl}/${url}.json`,
      oauth: this.oauth,
      form: options,
    }, callback);
  }

  /**
   * @memberof Twitter
   * @function delete
   * @description Make a get request to twitter api.
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
      uri: `${this.baseApiUrl}/${url}.json`,
      oauth: this.oauth,
      qs: options,
    }, callback);
  }
}

export default Twitter;
