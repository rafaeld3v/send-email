const express = require('express');
const cors = require('cors');
const routes = require('./controllers/routes');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


module.exports =  app;