import * as requestPromise from 'request-promise';
import { checkValidConfig } from '../utils';

export interface TwitterConfig {
  consumerKey: string;
  consumerSecret: string;
  accessToken: string;
  accessTokenSecret: string;
  apiVersion?: string;
}

class Twitter {
  private name: string;
  private config: {
    consumer_key: string;
    consumer_secret: string;
    token: string;
    token_secret: string;
  };
  private apiUrl: string;

  constructor(config: TwitterConfig) {
    this.name = 'twitter';
    checkValidConfig(
      ['consumerKey', 'consumerSecret', 'accessToken', 'accessTokenSecret'],
      config
    );
    this.config = {
      consumer_key: config.consumerKey,
      consumer_secret: config.consumerSecret,
      token: config.accessToken,
      token_secret: config.accessTokenSecret,
    };
    const apiVersion = config.apiVersion || '1.1';
    this.apiUrl = `https://api.twitter.com/${apiVersion}`;
  }

  public get(url: string, params: object = {}): Promise<any> {
    return requestPromise({
      method: 'GET',
      json: true,
      uri: `${this.apiUrl}/${url}.json`,
      oauth: this.config,
      qs: params,
    });
  }

  public post(url: string, params: object = {}): Promise<any> {
    return requestPromise({
      method: 'POST',
      json: true,
      uri: `${this.apiUrl}/${url}.json`,
      oauth: this.config,
      form: params,
    });
  }

  public delete(url: string, params: object = {}): Promise<any> {
    return requestPromise({
      method: 'DELETE',
      json: true,
      uri: `${this.apiUrl}/${url}.json`,
      oauth: this.config,
      qs: params,
    });
  }
}

export default Twitter;
