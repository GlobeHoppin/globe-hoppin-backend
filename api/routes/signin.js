const Express = require('express')
const User = require('../model/user')
const SigninRouter = new Express.Router()

SigninRouter.get('/', async (req, res, next) => {
    const user = await User.find({});
    res.status(200).json(user)
})

module.exports = SigninRouter