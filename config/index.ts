import configJson from './config.json';

interface Config {
  clientId: string;
  clientSecret: string;
  serveUrl: string;
  token: string;
  bandKey: string[];
  reply: {
    header: string;
    msg: string[];
    footer: string;
  };
}

const config: Config = configJson;

export default config;
