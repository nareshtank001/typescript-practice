import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouters';
import './constollers/LoginController';
import './constollers/RootController';

const app = express();

app.use(bodyParser.urlencoded());
app.use(cookieSession({ keys: ['asdsad'] }));
app.use(AppRouter.getInstance());

app.listen(3000, () => {
    console.log('Listning on port 3000');
});