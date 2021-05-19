import { Router } from "express";

import adsRouter from "./ads.routes";

const router = Router();

router.use(adsRouter);

export default router;
