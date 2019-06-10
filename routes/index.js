const bodyParser = require('body-parser');
const debug = require("../services/debug")

const sendHtml = require("../services/sendHtml")
const handler = require("../controllers/arduino")

//  проверка логирования
const { isLoggedIn, loggedCheker } = require('../controllers/logged.js');

const {
    userCreateValidator,
    userLoginValidator
} = require('../services/validator');

function initAuthControllers(app, passport)  {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    const urlencodedParser = bodyParser.urlencoded({ extended: false });

    //-------- рендер страниц -------------
    app.get('/', sendHtml.index);
    app.get('/datasPage', isLoggedIn, sendHtml.datasPage);
    app.get('/register', sendHtml.register);
    app.get('/sign_In', sendHtml.sign_In);


    //---------- API ----------------------
     app.get('/meteostationData', handler.getArduinoData) //сюда обращается клиент для получения инфы о датчиках 
     app.post('/meteostationData',  debug.seeQuery, handler.deleteOldArticles, handler.saveArduinoData,  sendHtml.success) //сюда обращается сама ардуинка
    // //при посте новой записи, удаляем старые
    app.post('/updateMeteoId', urlencodedParser, handler.updateMeteoId, sendHtml.success)

    app.get("/chartsValues", handler.getArrays) //для построения графиков

    app.get("/home" , sendHtml.home)


    app.get('/logout', sendHtml.logout)

    app.post('/register',urlencodedParser,userCreateValidator,
        passport.authenticate('local-signup', {
            successRedirect: '/datasPage',//не жди от этого чего-то
            failureRedirect: '/register'
        }),
    );

    app.post('/sign_In', urlencodedParser,userLoginValidator,
        passport.authenticate('local-signin', {
            successRedirect: '/datasPage', //это не робит так как нужно, но это хер уберешь, все ломается, тащите сюда одмена пасспорт джс
            failureRedirect: '/sign_In'
        })
    );
};

module.exports = {
    initAuthControllers
};