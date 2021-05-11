import { Router } from "express";

import GiveUpPositionInLineController from "../controllers/GiveUpPositionInLineController";

const giveUpPositionInLineRouter = Router();
const giveUpPositionInLineController = new GiveUpPositionInLineController();

giveUpPositionInLineRouter.post(
  "/give-up-position-in-line",
  giveUpPositionInLineController.index
);

export default giveUpPositionInLineRouter;
