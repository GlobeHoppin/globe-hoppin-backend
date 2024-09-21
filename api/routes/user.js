import Express from 'express'
import { validateToken } from '../middleware/auth'
import { getUserProfile } from '../controller'

const UserRouter = new Express.Router()

UserRouter.get('/', validateToken, getUserProfile)

export default UserRouter
