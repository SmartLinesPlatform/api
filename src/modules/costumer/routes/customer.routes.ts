import { Router } from "express";

import CustomerController from "../controllers/CustomerController";

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.get("/", customerController.index);
customerRouter.post("/", customerController.create);
customerRouter.get("/:customerId", customerController.read);
customerRouter.put("/:customerId", customerController.update);
customerRouter.delete("/:customerId", customerController.delete);

export default customerRouter;
