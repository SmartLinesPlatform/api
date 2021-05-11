import { Router } from "express";

import customerRouter from "./customer.routes";
import enterInLineRouter from "./enterInLine.routes";
import giveUpPositionInLineRouter from "./giveUpPositionInLine.routes";
import positionInLineRouter from "./positionInLine.routes";

const router = Router();

router.use(customerRouter);
router.use(enterInLineRouter);
router.use(positionInLineRouter);
router.use(giveUpPositionInLineRouter);

export default router;
