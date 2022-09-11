import fs from 'fs/promises';
import { BandConfig } from '../../config';
import generateTextFromTxt from './generateTextFromTxt';
import getAryRandomItem from './getAryRandomItem';

const getTxtFromCfg = async (config: BandConfig) =>
  config.reply.msg.length !== 0
    ? getAryRandomItem(config.reply.msg)
    : generateTextFromTxt(await fs.readFile('./config/randomText.txt', 'utf-8'));

const getReplyMsg = async (config: BandConfig) => {
  let msg = '';
  if (config.zombieMode) {
    try {
      const text = await fs.readFile(`./data/${config.key}.txt`, 'utf-8');
      msg = await generateTextFromTxt(text);
    } catch (error) {
      msg = await getTxtFromCfg(config);
    }
  } else {
    msg = await getTxtFromCfg(config);
  }
  return `${config.reply.header}${msg}${config.reply.footer}`;
};

export default getReplyMsg;
