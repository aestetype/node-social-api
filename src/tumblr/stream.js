import Stream from '../core/stream';

/**
 * @class TumblrStream
 * @description TumblrStream class
 * @example
 *
 * const stream = tumblr.stream('blog/:blog-identifier/posts');
 *
 * stream.on('message', (message) => {
 *  console.log(message);
 * });
 *
 * // handle stream error
 * stream.on('error', (err) => {
 *  // An error occur
 *  console.log(err);
 * });
 */
class TumblrStream extends Stream {
  /**
   * @private
   * @memberof TumblrStream
   * @description Create a new instance of TumblrStream class
   */
  constructor(tumblr, endpoint, options = {}) {
    super(options);
    this.tumblr = tumblr;
    this.endpoint = endpoint;
    this.interval = options.interval || 20000;
    if (options.runOnCreation !== false) {
      this.start();
    }
  }

  /**
   * @memberof TumblrStream
   * @private
   * @description Make a request on tumblr API.<br />
   * Cache the result and emit only new messages.
   */
  makeRequest() {
    this.tumblr.get(this.endpoint)
      .then((data) => {
        const posts = data.response.posts;
        if (posts.length > 0) {
          // Only return messages not in cache
          let newPosts = posts.filter(post => this.cache.indexOf(post.id) === -1);
          this.cache.push(...newPosts.map(post => post.id));
          // Only return messages created after the stream
          newPosts = newPosts.filter(post => this.startDate < new Date(post.date));
          if (newPosts.length > 0) {
            newPosts.forEach((newPost) => {
              this.emit('message', newPost);
            });
          }
        }
      })
      .catch((err) => {
        this.emit('error', err.error || err);
      });
  }
}

export default TumblrStream;
