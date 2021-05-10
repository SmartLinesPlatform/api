import { Router } from "express";
import attendantRouter from "./attendant.routes";

import callCustomerRouter from "./callCustomer.routes";
import finishAttendmentRouter from "./finishAttendment.routes";

const router = Router();

router.use(callCustomerRouter);
router.use(finishAttendmentRouter);
router.use(attendantRouter);

export default router;
