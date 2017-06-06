import * as requestPromise from 'request-promise';
import { checkValidConfig } from '../utils';

export interface TumblrConfig {
  consumerKey: string;
  apiVersion?: string;
}

class Tumblr {
  private name: string;
  private config: {
    api_key: string;
  };
  private apiUrl: string;

  constructor(config: TumblrConfig) {
    this.name = 'tumblr';
    checkValidConfig(['consumerKey'], config);
    this.config = {
      api_key: config.consumerKey,
    };
    const apiVersion = config.apiVersion || 'v2';
    this.apiUrl = `https://api.tumblr.com/${apiVersion}`;
  }

  get(url: string, params: object): Promise<any> {
    return requestPromise({
      method: 'GET',
      json: true,
      uri: `${this.apiUrl}/${url}`,
      qs: { ...this.config, ...params },
    });
  }

  post(url: string, params: object): Promise<any> {
    return requestPromise({
      method: 'POST',
      json: true,
      uri: `${this.apiUrl}/${url}`,
      form: { ...this.config, ...params },
    });
  }
}

export default Tumblr;
