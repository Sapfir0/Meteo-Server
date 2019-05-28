const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const app = express();
const { port } = require('./config/config.js');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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


app.listen(port, err => {
    if (!err) console.log('Server started on ' + port + ' port');
    else console.error('Server not started');
});


