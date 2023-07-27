import express from 'express';
import bodyParser from 'body-parser';
import routerApi from './routers/api.router.js'

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routerApi);

export default app;
