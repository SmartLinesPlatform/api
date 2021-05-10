import { Router } from "express";

import callCustomerRouter from "./area.routes";

const router = Router();

router.use(callCustomerRouter);

export default router;
