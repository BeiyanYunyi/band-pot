/* eslint-disable no-console */
import http from 'http';
import fs from 'fs/promises';
import app from './app';
import botController from './controller/botController';
import zombieController from './controller/zombieController';

botController();
zombieController();
process.on('uncaughtException', async (e) => {
  console.log(e);
  await fs.writeFile('error.log', e.stack || e.message);
});
const server = http.createServer(app);
server.listen(3000, '127.0.0.1');
console.log('Server running at port 3000');
