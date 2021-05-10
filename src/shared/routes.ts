import areaRoutes from "@modules/area/routes/area.routes";
import attendantRoutes from "@modules/attendant/routes";
import categoryRoutes from "@modules/category/routes/category.routes";
import customerRoutes from "@modules/costumer/routes";
import lineRoutes from "@modules/line/routes/line.routes";
import storeRouter from "@modules/store/routes";
import { Router } from "express";

const routes = Router();

routes.use("/stores", storeRouter);
routes.use("/customers", customerRoutes);
routes.use("/lines", lineRoutes);
routes.use("/categories", categoryRoutes);
routes.use("/attendants", attendantRoutes);
routes.use("/areas", areaRoutes);

export default routes;
