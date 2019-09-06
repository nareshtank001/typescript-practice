import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { router } from './routes/loginRoutes';

const app = express();

app.use(bodyParser.urlencoded());
app.use(cookieSession({ keys: ['asdsad'] }));
app.use(router);

app.listen(3000, () => {
    console.log('Listning on port 3000');
});