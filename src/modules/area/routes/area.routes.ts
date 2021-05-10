import { Router } from "express";

import AreaController from "../controllers/AreaController";

const areaRouter = Router();
const areaController = new AreaController();

areaRouter.post("/", areaController.create);

export default areaRouter;
