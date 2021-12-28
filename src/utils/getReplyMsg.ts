import config from '../../config';
import generateTextFromTxt from './generateTextFromTxt';
import getAryRandomItem from './getAryRandomItem';

const getReplyMsg = async () => {
  const msg: string =
    config.reply.msg.length !== 0
      ? getAryRandomItem(config.reply.msg)
      : await generateTextFromTxt();
  return `${config.reply.header}${msg}${config.reply.footer}`;
};

export default getReplyMsg;
