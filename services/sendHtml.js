
const config = require("../config/config")


const index = (req, res ) => {
    if (req.isAuthenticated()) {
        res.redirect("/datasPage")
    }
    else {
        res.sendFile(config.viewsDir + "index.html")
    }
}

const success = (req, res) => {
    res.send("Успешно")
}

const sign_In = (req, res  ) => {
    if (req.isAuthenticated()) {
        res.redirect("/datasPage")
    }
    else {
        res.sendFile(config.viewsDir + "sign_In.html")
    }
}

const register = (req, res  ) => {
    if (req.isAuthenticated()) {
        res.redirect("/datasPage")
    }
    else {
        res.sendFile(config.viewsDir + "register.html")
    }
}

const datasPage = (req, res) => {
    res.sendFile(config.viewsDir + "datasPage.html")
}

const logout = (req, res ) => {
    req.session.destroy(err => {
        console.error(err)
        res.redirect("/");
    });
};

const home = (req, res) => {
    res.sendFile(config.viewsDir + "home.html")
}

module.exports = {
    index,
    success,
    register,
    sign_In,
    datasPage,
    logout,
    home
}
