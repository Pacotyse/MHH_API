import dotenv from 'dotenv';
import http from 'http';
import app from './app/app.js';

dotenv.config();

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server launched at http://localhost:${port}`);
});
