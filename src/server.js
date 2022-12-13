import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine.js';
import initWebRoutes from './route/web.js';
import connectDB from './config/connectDB.js';
import cors from 'cors';

require('dotenv').config();

let app = express();
app.use(cors({ origin: '*' }));

//config app

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

viewEngine(app);
initWebRoutes(app);

//connect to DB
connectDB();

let port = process.env.PORT || 8081;

app.listen(port, () => {
  //callback
  console.log(`App is running at: http://localhost:${port}`);
});
