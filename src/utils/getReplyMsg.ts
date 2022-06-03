import fs from 'fs/promises';
import { BandConfig } from '../../config';
import generateTextFromTxt from './generateTextFromTxt';
import getAryRandomItem from './getAryRandomItem';

const getReplyMsg = async (config: BandConfig) => {
  const msg: string =
    config.reply.msg.length !== 0
      ? getAryRandomItem(config.reply.msg)
      : await generateTextFromTxt((await fs.readFile('./config/randomText.txt')).toString());
  return `${config.reply.header}${msg}${config.reply.footer}`;
};

export default getReplyMsg;
