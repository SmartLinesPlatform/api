import customerRoutes from "@modules/costumer/routes";
import storeRouter from "@modules/store/routes";
import { Router } from "express";

const routes = Router();

routes.use("/stores", storeRouter);
routes.use("/customers", customerRoutes);

export default routes;
