import Express from 'express'
import User from '../model/user'
const SigninRouter = new Express.Router()

SigninRouter.get('/signin', async (req, res, next) => {
    const user = await User.find({});
    return res.status(200).json(user)
})

export default SigninRouter