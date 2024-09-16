import Express from 'express'
import User from '../model/user'
const HealthRouter = new Express.Router()

HealthRouter.get('/', async (req, res, next) => {
    return res.status(200).json({
        status: 200,
        message: 'OK'
    })
})

export default HealthRouter