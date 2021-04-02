import { Router } from "express";

import lineRouter from "./line.routes";

const router = Router();

router.use(lineRouter);

export default router;
