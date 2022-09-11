import fs from 'fs/promises';
import config from '../../config';
import bandWrapper from '../bandWrapper';

const getRandomSentence = () =>
  Promise.all(
    config.band
      .filter((band) => band.zombieMode)
      .map(async (band) => {
        const { key: bandKey } = band;
        let txt = '';
        const posts = await bandWrapper.getPosts({ token: config.token, bandKey, locale: 'zh_CN' });
        txt += `${posts.result_data.items.map((item) => item.content).join('|')}|`;
        const pms = posts.result_data.items.map(async (post) => {
          const resp = await bandWrapper.getComments({
            token: config.token,
            bandKey,
            postKey: post.post_key,
            sort: '-created_at',
          });
          resp.result_data.items.forEach((comment, index) => {
            if (index === resp.result_data.items.length - 1) {
              txt += `${comment.content}`;
            } else txt += `${comment.content}|`;
          });
        });
        await Promise.all(pms);
        txt = txt.replaceAll('\n', '');
        await fs.writeFile(`./data/${bandKey}.txt`, txt, { encoding: 'utf8' });
      }),
  );

const zombieController = async () => {
  await getRandomSentence();
  // 每小时获取一次就好
  setInterval(() => {
    getRandomSentence();
  }, 1000 * 60 * 60);
};

export default zombieController;
