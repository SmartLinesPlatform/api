import { Router } from "express";

import FinishAttendmentController from "../controllers/FinishAttendmentController";

const finishAttendmentRouter = Router();
const finishAttendmentController = new FinishAttendmentController();

finishAttendmentRouter.post(
  "/finish-attendment",
  finishAttendmentController.index
);

export default finishAttendmentRouter;
