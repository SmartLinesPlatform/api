import { Router } from "express";

import EnterInLineController from "../controllers/EnterInLineController";

const enterInLineRouter = Router();
const enterInLineController = new EnterInLineController();

enterInLineRouter.post("/enter-in-line", enterInLineController.index);

export default enterInLineRouter;
