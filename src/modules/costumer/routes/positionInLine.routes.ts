import { Router } from "express";

import PositionInLineController from "../controllers/PositionInLineController";

const positionInLineRouter = Router();
const positionInLineController = new PositionInLineController();

positionInLineRouter.post(
  "/current-position-in-line",
  positionInLineController.index
);

export default positionInLineRouter;
