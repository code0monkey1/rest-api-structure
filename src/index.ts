import express from 'express';

const server = express();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('listening to port ', PORT);
});
