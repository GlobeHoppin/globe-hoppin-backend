const Express=require("express");
const User = require("../model/user");
const HealthRouter = Express.Router();

HealthRouter.get('/', async (req, res, next) => {
    return res.status(200).json({
        status: 200,
        message: 'OK'
    })
})

module.exports = HealthRouter;