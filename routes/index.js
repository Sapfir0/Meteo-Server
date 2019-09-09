const bodyParser = require("body-parser");
const debug = require("../services/debug")

const sendHtml = require("../services/sendHtml")
const handler = require("../controllers/devices/meteostation")


//  проверка логирования
const { isLoggedIn} = require("../controllers/users/logged.js");

const {
    userCreateValidator,
    userLoginValidator
} = require("../services/validator");

const id = require("../controllers/users/checkId")
const profile = require("../controllers/profiles")
const pushController = require("../controllers/push");
function initAuthControllers(app, passport)  {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    const urlencodedParser = bodyParser.urlencoded({ extended: false });

    //-------- рендер страниц -------------
    app.get("/", sendHtml.index);
    app.get("/datasPage", isLoggedIn, sendHtml.datasPage);
    app.get("/register", sendHtml.register);
    app.get("/sign_In", sendHtml.sign_In);
    app.get("/home", isLoggedIn, sendHtml.home)
    app.get("/logout", sendHtml.logout)


    //---------- API ----------------------
    app.get("/meteostationData", isLoggedIn, /* id.checkUserId,*/ handler.getMeteostationData) //сюда обращается клиент для получения инфы о датчиках 
    app.post("/meteostationData", debug.seeQuery, debug.seeBody, handler.deleteOldArticles, handler.saveArduinoData,  sendHtml.success) //сюда обращается сама ардуинка
    
    app.get("/chartsValues", isLoggedIn, handler.getArrays) //для построения графиков
    
    app.post("/updateMeteoId", urlencodedParser, handler.updateMeteoId, sendHtml.success)
    
    app.post("/applySettings", profile.updateSettings, sendHtml.success )

    app.post("/push/subscribe", pushController.subscribe);
    app.post("/push/unsubscribe", pushController.unsubscribe);

    //----------Users API------------------------
    app.post("/register",urlencodedParser,userCreateValidator,
        passport.authenticate("local-signup", {
            successRedirect: "/datasPage",//не жди от этого чего-то
            failureRedirect: "/register"
        }),
    );

    app.post("/sign_In", urlencodedParser,userLoginValidator,
        passport.authenticate("local-signin", {
            successRedirect: "/datasPage", //это не робит так как нужно, но это хер уберешь, все ломается, тащите сюда одмена пасспорт джс
            failureRedirect: "/sign_In"
        })
    );
}

module.exports = {
    initAuthControllers
};