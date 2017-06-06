import * as rp from 'request-promise';
import { checkValidConfig } from '../utils';

export interface InstagramConfig {
  clientId: string;
  accessToken: string;
  apiVersion?: string;
}

class Instagram {
  private name: string;
  private config: {
    client_id: string;
    access_token: string;
  };
  private apiUrl: string;

  constructor(config: InstagramConfig) {
    this.name = 'instagram';
    checkValidConfig(['clientId', 'accessToken'], config);
    this.config = {
      client_id: config.clientId,
      access_token: config.accessToken,
    };
    const apiVersion = config.apiVersion || 'v1';
    this.apiUrl = `https://api.instagram.com/${apiVersion}`;
  }

  get(url: string, params: object): Promise<any> {
    return rp({
      method: 'GET',
      json: true,
      uri: `${this.apiUrl}/${url}`,
      qs: { ...this.config, ...params },
    });
  }

  post(url: string, params: object): Promise<any> {
    return rp({
      method: 'POST',
      json: true,
      uri: `${this.apiUrl}/${url}`,
      form: { ...this.config, ...params },
    });
  }

  delete(url: string, params: object): Promise<any> {
    return rp({
      method: 'DELETE',
      json: true,
      uri: `${this.apiUrl}/${url}`,
      qs: { ...this.config, ...params },
    });
  }
}

export default Instagram;
