import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
import cors from 'cors';

require('dotenv').config();

let app = express();
app.use(cors({ origin: '*' }));

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

//connect to DB
connectDB();

let port = process.env.PORT || 8081;

app.listen(port, () => {
  //callback
  console.log(`App is running at: http://localhost:${port}`);
});
