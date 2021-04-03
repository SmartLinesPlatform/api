import { Router } from "express";

import categoryRouter from "./category.routes";

const router = Router();

router.use(categoryRouter);

export default router;
