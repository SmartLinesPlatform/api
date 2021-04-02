import { Router } from "express";

import LineController from "../controllers/LineController";

const lineRouter = Router();
const lineController = new LineController();

lineRouter.get("/", lineController.index);
lineRouter.post("/", lineController.create);
lineRouter.get("/:lineId", lineController.read);
lineRouter.put("/:lineId", lineController.update);
lineRouter.delete("/:lineId", lineController.delete);

export default lineRouter;
