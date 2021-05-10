import { Router } from "express";

import AttendantController from "../controllers/AttendantController";

const attendantRouter = Router();
const attendantController = new AttendantController();

attendantRouter.post(
  "/",
  attendantController.create
);

export default attendantRouter;
