import configJson from './config.json';

export interface BandConfig {
  key: string;
  zombieMode?: boolean;
  reply: {
    header: string;
    msg: string[];
    footer: string;
  };
}

interface Config {
  clientId: string;
  clientSecret: string;
  serveUrl: string;
  token: string;
  band: BandConfig[];
}

const config: Config = configJson;

export default config;
