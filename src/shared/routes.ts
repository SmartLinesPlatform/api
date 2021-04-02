import customerRoutes from "@modules/costumer/routes";
import lineRoutes from "@modules/line/routes/line.routes";
import storeRouter from "@modules/store/routes";
import { Router } from "express";

const routes = Router();

routes.use("/stores", storeRouter);
routes.use("/customers", customerRoutes);
routes.use("/lines", lineRoutes);

export default routes;
