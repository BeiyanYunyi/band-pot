import config from '../../config';

const getReplyMsg = () => {
  const msgIndex = Math.floor(Math.random() * config.reply.msg.length);
  return `${config.reply.header}${config.reply.msg[msgIndex]}${config.reply.footer}`;
};

export default getReplyMsg;
