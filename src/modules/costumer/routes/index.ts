import { Router } from "express";

import customerRouter from "./customer.routes";
import partnerStoresRouter from "./partnerStores.routes";

const router = Router();

router.use(partnerStoresRouter);
router.use(customerRouter);

export default router;
