import config from '../../config';
import bandWrapper from '../bandWrapper';
import getNoReplyPosts from '../utils/getNoReplyPosts';
import getReplyMsg from '../utils/getReplyMsg';

const task = async () => {
  const postKeys = await getNoReplyPosts();
  if (postKeys.length !== 0) console.log({ postKeys });
  await Promise.all(
    postKeys.map(async (post) => {
      await bandWrapper.writeComment({
        token: config.token,
        bandKey: post.bandKey,
        postKey: post.postKey,
        body: getReplyMsg(),
      });
    }),
  );
};

const botController = async () => {
  await task();
  setInterval(() => {
    task();
  }, 1000 * 60 * 5);
};

export default botController;
