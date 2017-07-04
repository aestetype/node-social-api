import * as requestPromise from 'request-promise';
import { checkValidConfig } from '../utils';

export interface GithubConfig {
  public?: string;
  accessToken?: string;
  userAgent?: string;
}

class Github {
  private name: string;
  private config: {
    access_token: string;
  };
  private headers: {
    'User-Agent': string;
  };
  private apiUrl: string;

  constructor(config: GithubConfig) {
    this.name = 'github';
    if (!config.public) {
      checkValidConfig(['accessToken'], config);
    }
    this.config = {
      access_token: config.accessToken,
    };
    this.headers = {
      'User-Agent': config.userAgent || '@aestetype/node-social-api',
    };
    this.apiUrl = 'https://api.github.com';
  }

  public get(url: string, params: object): Promise<any> {
    return requestPromise({
      method: 'GET',
      json: true,
      headers: this.headers,
      uri: `${this.apiUrl}/${url}`,
      qs: { ...this.config, ...params },
    });
  }

  public post(url: string, params: object): Promise<any> {
    return requestPromise({
      method: 'POST',
      json: true,
      headers: this.headers,
      uri: `${this.apiUrl}/${url}`,
      form: { ...this.config, ...params },
    });
  }

  public delete(url: string, params: object): Promise<any> {
    return requestPromise({
      method: 'DELETE',
      json: true,
      headers: this.headers,
      uri: `${this.apiUrl}/${url}`,
      qs: { ...this.config, ...params },
    });
  }
}

export default Github;
