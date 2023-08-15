import http from 'http';
import app from './app';

import { APP_PORT } from './config';

const server = http.createServer(app);

const PORT = APP_PORT || 3000;

server
  .listen(PORT, () => {
    console.log('listening to port ', PORT);
  })
  .on('error', (err) => {
    console.log(`App server listener error: ${err.message}`);
  });
