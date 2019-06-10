const userControl = require("./authorization")
const UserApi = require("../../services/user")

const loadPasportStrategies = (passport, user) => {
    const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // для логаута (камингаута)
    passport.deserializeUser((id, done) => {
        //находим юзера
        UserApi.getUserById(id).then(user => {
            done(null, user.get()); //нашли
        }).catch(err => {
            done(err, null); //не нашли
        });
    });



    passport.use('local-signup',
        new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            userControl.registerUser
        )
    );


    passport.use('local-signin',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true //позволяет нам передать весь запрос на обратный вызов
            },
            userControl.loginUser
        )
    );

};

module.exports = {
    loadPasportStrategies
};