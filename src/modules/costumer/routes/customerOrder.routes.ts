import { Router } from "express";

import CustomerOrderController from "../controllers/CustomerOrderController";

const customerOrderRouter = Router();
const customerOrderController = new CustomerOrderController();

customerOrderRouter.post("/orders", customerOrderController.create);

export default customerOrderRouter;
