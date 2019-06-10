const { User } = require('../database/tables')


function changeMeteoId(userId, meteostationId) {
    console.log(userId)
    console.log(meteostationId)
    return User.update({
        where: {
            id: userId
        },
        meteostationId
    })
}


function getUserById(userId) {
    return User.findOne({
        where: {
           id: userId
        }
    })
}

function getUserByEmail(email) {
    return User.findOne({
        where: {
           email: email
        }
    })
}

function createUser(email, password) {
    return User.create({
        email,
        password
    })
}

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    changeMeteoId
}