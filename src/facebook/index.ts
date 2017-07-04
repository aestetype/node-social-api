import * as requestPromise from 'request-promise';
import { checkValidConfig } from '../utils';

export interface FacebookConfig {
  appId?: string;
  appSecret?: string;
  accessToken?: string;
  apiVersion?: string;
}

class Facebook {
  private name: string;
  private config: {
    access_token: string;
  };
  private apiUrl: string;

  constructor(config: FacebookConfig) {
    this.name = 'facebook';
    if (!config.accessToken) {
      checkValidConfig(['appId', 'appSecret'], config);
    }
    this.config = {
      access_token: config.accessToken || `${config.appId}|${config.appSecret}`,
    };
    const apiVersion = config.apiVersion || 'v2.9';
    this.apiUrl = `https://graph.facebook.com/${apiVersion}`;
  }

  public get(url: string, params: object): Promise<any> {
    return requestPromise({
      method: 'GET',
      json: true,
      uri: `${this.apiUrl}/${url}`,
      qs: { ...this.config, ...params },
    });
  }

  public post(url: string, params: object): Promise<any> {
    return requestPromise({
      method: 'POST',
      json: true,
      uri: `${this.apiUrl}/${url}`,
      form: { ...this.config, ...params },
    });
  }

  public delete(url: string, params: object): Promise<any> {
    return requestPromise({
      method: 'DELETE',
      json: true,
      uri: `${this.apiUrl}/${url}`,
      qs: { ...this.config, ...params },
    });
  }
}

export default Facebook;
