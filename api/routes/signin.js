const Express = require('express')
const User = require('../model/user')
const SigninRouter = new Express.Router()

SigninRouter.get('/', async (req, res, next) => {
    const user = new User({
        email: "test@test.com",
        password: "testtest",
        name: "Test User"
    })
    await user.save()
    res.status(201).send(user)
})

module.exports = SigninRouter