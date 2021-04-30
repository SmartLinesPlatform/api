import { Router } from "express";

import customerRouter from "./customer.routes";
import enterInLineRouter from "./enterInLine.routes";

const router = Router();

router.use(customerRouter);
router.use(enterInLineRouter);

export default router;
