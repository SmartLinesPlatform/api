import { Router } from "express";

import CallCustomerController from "../controllers/CallCustomerController";

const callCustomerRouter = Router();
const callCustomerController = new CallCustomerController();

callCustomerRouter.post("/call-next-customer", callCustomerController.index);

export default callCustomerRouter;
