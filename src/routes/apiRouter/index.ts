import express from 'express';
import bandWrapper from '../../bandWrapper';

require('express-async-errors');

const apiRouter = express.Router();

apiRouter.use(express.json());

apiRouter.get('/authForBand', async (req, res) => {
  const data = await bandWrapper.getAuthCode();
  res.redirect(data);
});

apiRouter.get('/authedForBand', async (req, res) => {
  const code = req.query as { code: string | undefined };
  if (!code.code) {
    return res.status(400).end();
  }
  const data = await bandWrapper.getToken(code.code);
  const data2 = await bandWrapper.getBands(data.access_token);
  const data3 = await bandWrapper.getPosts({
    token: data.access_token,
    bandKey: data2.result_data.bands[0].band_key,
    locale: 'en_US',
  });
  return res.json({ data, data2, data3 });
});

export default apiRouter;
