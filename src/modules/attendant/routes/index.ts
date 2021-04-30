import { Router } from "express";

import callCustomerRouter from "./callCustomer.routes";
import finishAttendmentRouter from "./finishAttendment.routes";

const router = Router();

router.use(callCustomerRouter);
router.use(finishAttendmentRouter);

export default router;
