const { body } = require("express-validator/check");

const emailVaidator = body("email")
    .isEmail()
    .normalizeEmail();


const passwordValidator = body("password")
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 5 })
    .withMessage("so short")
    .trim()
    .isLength({ max: 50 })
    .withMessage("very big");


const validators = {
    userCreateValidator: [emailVaidator, passwordValidator],
    userLoginValidator: [emailVaidator, passwordValidator],
};

module.exports = validators;
