const validators = {
    register: {
        validationFailed: 'Валидация не пройдена',
        existedEmail: 'Емейл уже занят',
        userNotCreated: 'Юзер не создан',
    },
    signIn: {
        emailNotExisted: 'Такого емейла не существует',
        incorrectPassword: 'Неправильный пароль.'
    }
}

module.exports = {
    validators
}