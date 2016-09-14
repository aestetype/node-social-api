import Stream from '../core/stream';

/**
 * @private
 * @class FacebookStream
 * @description FacebookStream class
 */
class FacebookStream extends Stream {
  /**
   * @private
   * @memberof FacebookStream
   * @description Create a new instance of FacebookStream class
   */
  constructor(facebook, endpoint, options = {}) {
    super(options);
    this.facebook = facebook;
    this.endpoint = endpoint;
    this.interval = options.interval || 20000;
    if (options.runOnCreation !== false) {
      this.start();
    }
  }

  /**
   * @memberof FacebookStream
   * @private
   * @description Make a request on tumblr API.<br />
   * Cache the result and emit only new messages.
   */
  makeRequest() {
    this.facebook.get(this.endpoint)
      .then((data) => {
        const posts = data.data;
        if (posts.length > 0) {
          // Only return messages not in cache
          let newPosts = posts.filter(post => this.cache.indexOf(post.id) === -1);
          this.cache.push(...newPosts.map(post => post.id));
          // Only return messages created after the stream
          newPosts = newPosts.filter(post => this.startDate < new Date(post.updated_time));
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

export default FacebookStream;
