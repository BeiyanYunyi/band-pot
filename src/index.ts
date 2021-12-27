/* eslint-disable no-console */
import http from 'http';
import app from './app';
import botController from './controller/botController';

botController();
const server = http.createServer(app);
server.listen(3000, '127.0.0.1');
console.log('Server running at port 3000');
