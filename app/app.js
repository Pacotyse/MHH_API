import express from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import routerApi from './routers/api.router.js';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure: false,
    maxAge: parseInt(process.env.SESSION_DURATION)
  }
}));

app.use(routerApi);

export default app;
