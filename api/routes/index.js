const SigninRouter = require("./signin");

const Routes = [{ path: "/signin", router: SigninRouter }];

Routes.init = (app) => {
    if (!app || !app.use) {
        console.error('[Error] Route Initialization Failed: app / app.use is undefined')
        return process.exit(1)
    }

    Routes.forEach((route) => {
        app.use(route.path, route.router)
    })

    app.use('*', (req, res, next) => {
        return res.status(404).json({
            status: 404,
            error: 'NOT FOUND'
        })
    })
}

module.exports = Routes