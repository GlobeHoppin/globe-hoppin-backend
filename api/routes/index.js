import AuthRouter from "./auth";
import HealthRouter from "./health";
import PinRouter from "./pin";
import UserRouter from "./user";
import NotificationRouter from "./notification";
import ReviewRouter from "./review";
const Routes = [
  { path: "/", router: HealthRouter },
  { path: "/auth", router: AuthRouter },
  { path: "/pin", router: PinRouter },
  { path: "/user", router: UserRouter },
  { path: "/notification", router: NotificationRouter },
  { path: "/review", router: ReviewRouter }
];

Routes.init = (app) => {
  if (!app || !app.use) {
    console.error(
      "[Error] Route Initialization Failed: app / app.use is undefined"
    );
    return process.exit(1);
  }

  Routes.forEach((route) => {
    app.use(route.path, route.router);
  });

  app.use("*", (req, res, next) => {
    return res.status(404).json({
      status: 404,
      error: "NOT FOUND",
    });
  });
};

export default Routes;
