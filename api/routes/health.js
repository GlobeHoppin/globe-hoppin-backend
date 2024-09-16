import Express from 'express'
import User from '../model/user'
const HealthRouter = new Express.Router()

HealthRouter.get('/', async (req, res, next) => {
    return res.status(404).json({
        status: 200,
        message: 'OKK'
    })
})

export default HealthRouter