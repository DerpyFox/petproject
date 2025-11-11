import type { Application } from "express";
import tutorialRoutes from "./tutorial.routes.js";
import homeRoutes from "./home.routes.js";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/tutorials", tutorialRoutes);
  }
}