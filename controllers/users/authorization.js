/* Passport js authentificate */

const { validationResult } = require("express-validator/check");
const UserApi = require("../../services/user")
const {validators } = require("./errorStrings")
const profileApi = require("../../services/profiles")


async function loginUser(req, email, password, next)  { //некст нас не кинет на следующий обработчик
    const res = req.res;

    try {
        const user = await UserApi.getUserByEmail(email)
        if (!user) {
            throw new Error(validators.signIn.emailNotExisted);  
        }
        if (!UserApi.isValidPassword(user.password, password)) {
            throw new Error(validators.signIn.incorrectPassword);
        }
        const userinfo = user.get();
        return next(null, userinfo);
    }
    catch(err) {
        res.statusCode = 406;
        res.send(err.message)
    }


}

function registerUser(req, email, password, done) {
    const res = req.res;

    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        res.statusCode = 406;
        res.send(validators.register.validationFailed)
    }

    UserApi.getUserByEmail(email).then(user => {
        //console.log(user)
        if (user) {
            throw new Error(validators.register.existedEmail);
        } else {
            const userPassword = UserApi.generateHash(password); // зашифрованный

            UserApi.createUser(email, userPassword).then((newUser) => {
                if (!newUser) {
                    throw new Error(validators.register.userNotCreated);
                }

                //profileApi.writeEmptyProfile()

                done(null, newUser); //все ок
            }).catch(err => {
                // не все ок
                res.statusCode = 406;
                res.send(err.message)
            });
        }
    }).catch((err) => {
        res.statusCode = 406;
        res.send(err.message)
    })
}
    //TO DO /почему-то оно не робит
// async function registerUser(req, email, password, done) {
//     const res = req.res;

//     const errors = validationResult(req); 
//     if (!errors.isEmpty()) {
//         res.statusCode = 406;
//         res.send(validators.register.validationFailed)
//     }

//     try {
//         const user = await UserApi.getUserByEmail(email)
//         if (user) {
//             throw new Error(validators.register.existedEmail);
//         }
//         const userPassword = UserApi.generateHash(password); 
        
//         const newUser = UserApi.createUser(email, userPassword)
//         if (!newUser) {
//             throw new Error(validators.register.userNotCreated);
//         }
        
//         done(null, newUser); //все ок

//     } catch (err) {
//         res.statusCode = 406;
//         res.send(err.message)
//     }

// }


module.exports = {
    loginUser,
    registerUser
}