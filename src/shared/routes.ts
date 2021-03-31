import { Router } from "express";

import storeRouter from "../modules/store/routes";

const routes = Router();

routes.use("/stores", storeRouter);

export default routes;
