import { Router } from "express";

import callCustomer from "./callCustomer.routes";

const router = Router();

router.use(callCustomer);

export default router;
