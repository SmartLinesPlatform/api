import { Router } from "express";

import customerRouter from "./customer.routes";
import customerOrderRouter from "./customerOrder.routes";
import partnerStoresRouter from "./partnerStores.routes";

const router = Router();

router.use(partnerStoresRouter);
router.use(customerRouter);
router.use(customerOrderRouter);

export default router;
