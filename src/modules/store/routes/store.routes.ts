import { Router } from "express";

import StoreController from "../controllers/StoreController";

const storeRouter = Router();
const storeController = new StoreController();

storeRouter.get("/", storeController.index);
storeRouter.post("/", storeController.create);
storeRouter.get("/:storeId", storeController.read);
storeRouter.put("/:storeId", storeController.update);
storeRouter.delete("/:storeId", storeController.delete);

export default storeRouter;
