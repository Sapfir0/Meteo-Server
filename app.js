const express = require("express");
const path = require("path");
const logger = require("morgan");

const app = express();
const models = require("./database/models");
const config = require("./config/config.js");
const favicon = require("serve-favicon");

app.use(logger("dev"));

///////////////////////////////////////////

const webPush = require("web-push");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));
app.use(express.static("node_modules"))

app.use(favicon(path.join(config.imgDir, "favicon.ico")));

//push
webPush.setVapidDetails(
    "mailto:hallo@justmarkup.com",
    process.env.PUBLIC_VAPID_KEY, 
    process.env.PRIVATE_VAPID_KEY
  );
//!push

const { initAuthControllers } = require("./routes/index.js");
const { loadPasportStrategies } = require("./controllers/users/users");
const session = require("express-session");
const passport = require("passport");

app.use(
    session({ secret: config.secretKey, resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize()); //возможно, нужно чистить сессии
app.use(passport.session()); // persistent login sessions


initAuthControllers(app, passport);
loadPasportStrategies(passport, models.user)



models.sequelize
    .sync()
    .then(() => {
        console.log("Nice! Database looks fine");
    })
    .catch(err => {
        console.log("Something went wrong with the Database Update!");
        console.log("Crashed with error: "+ err)
});


app.listen(config.port, err => {
    if (!err) console.log("Server started on " + config.port + " port");
    else console.error("Server not started");
});


module.exports = app

