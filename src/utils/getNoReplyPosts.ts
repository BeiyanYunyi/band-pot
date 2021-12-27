import config from '../../config';
import bandWrapper from '../bandWrapper';

const getNoReplyPosts = async () => {
  const postKeysToReply: { postKey: string; bandKey: string }[] = [];
  await Promise.all(
    config.bandKey.map(async (bandKey) => {
      const posts = await bandWrapper.getPosts({ token: config.token, bandKey, locale: 'en_US' });
      posts.result_data.items.forEach((item) => {
        if (item.comment_count === 0) postKeysToReply.push({ postKey: item.post_key, bandKey });
      });
    }),
  );
  return postKeysToReply;
};

export default getNoReplyPosts;
