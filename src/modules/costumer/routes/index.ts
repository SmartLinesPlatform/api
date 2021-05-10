import { Router } from "express";

import customerRouter from "./customer.routes";
import enterInLineRouter from "./enterInLine.routes";
import positionInLineRouter from "./positionInLine.routes";

const router = Router();

router.use(customerRouter);
router.use(enterInLineRouter);
router.use(positionInLineRouter);

export default router;
