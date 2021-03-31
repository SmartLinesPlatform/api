import { Router } from "express";

import StoreController from "../controllers/StoreController";

const router = Router();
const storeController = new StoreController();

router.get("/", storeController.index);
router.post("/", storeController.create);

export default router;
