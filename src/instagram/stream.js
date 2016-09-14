import Stream from '../core/stream';

/**
 * @class InstagramStream
 * @description InstagramStream class
 * @example
 *
 * // Streaming can be used on all endpoints taking MIN_TAG_ID as parameter
 * const stream = instagram.stream('tags/:tag-name/media/recent');
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
class InstagramStream extends Stream {
  /**
   * @private
   * @memberof InstagramStream
   * @description Create a new instance of stream class
   */
  constructor(instagram, endpoint, options = {}) {
    super();
    this.instagram = instagram;
    this.endpoint = endpoint;
    this.interval = options.interval || 10000;
    this.minTagId = options.minTagId;
    if (options.runOnCreation !== false) {
      this.start();
    }
  }

  /**
   * @memberof InstagramStream
   * @private
   * @description Make a request on instagram API.<br />
   * Cache the result and emit only new messages.
   */
  makeRequest() {
    const params = {};
    if (this.minTagId) {
      params.min_tag_id = this.minTagId;
    }
    this.instagram.get(this.endpoint, params)
      .then((data) => {
        if (data.data.length > 0) {
          // Only return messages not in cache
          let newPosts = data.data.filter(post => this.cache.indexOf(post.id) === -1);
          this.cache.push(...newPosts.map(post => post.id));
          // Only return messages created after the stream
          newPosts = newPosts.filter(post => this.startDate < post.created_time * 1000);
          if (data.pagination.min_tag_id) {
            this.minTagId = data.pagination.min_tag_id;
            this.cache = [];
          }
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

export default InstagramStream;
