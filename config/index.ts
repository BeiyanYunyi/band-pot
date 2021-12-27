import configJson from './config.json';

interface Config {
  clientId: string;
  clientSecret: string;
  serveUrl: string;
  token: string;
  bandKey: string[];
}

const config: Config = configJson;

export default config;
