import { Router } from "express";

import orderRouter from "./order.routes";

const router = Router();

router.use(orderRouter);

export default router;
