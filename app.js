const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const app = express();
const models = require('./database/models');
const config = require('./config/config.js');
const favicon = require('serve-favicon');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.static('node_modules/chart.js/dist'))

app.use(favicon(path.join(config.imgDir, 'favicon.ico')));

app.use('/', indexRouter)


models.sequelize
    .sync()
    .then(() => {
        console.log('Nice! Database looks fine');
    })
    .catch(err => {
        console.log('Something went wrong with the Database Update!');
        console.log("Crashed with error: "+ err)
});


app.listen(config.port, err => {
    if (!err) console.log('Server started on ' + config.port + ' port');
    else console.error('Server not started');
});


