const bCrypt = require('bcryptjs');
const { User } = require('../database/tables')


function changeMeteoId(userId, meteostationId) {
    // UPDATE user SET meteostationId=meteostationId WHERE id=userId
    console.log(userId)
    console.log(meteostationId)
    return User.update({
        meteostationId,
    }, 
        {
            where: {
                id: userId
            }
        }
    )
}

function changePC_id(userId, PC_id) {
    return User.update({
        PC_id,
    }, 
        {
            where: {
                id: userId
            }
        }
    )
}

function getMeteoIdByuserId(userId) {
    return User.findOne({
        attributes: [
            'meteostationId'
        ],
        where: {
            id: userId
        }
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

function generateHash (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10),null);
}

function isValidPassword(userpass, password) {
    return bCrypt.compareSync(password, userpass);
}

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    changeMeteoId,
    generateHash,
    isValidPassword,
    changePC_id
}