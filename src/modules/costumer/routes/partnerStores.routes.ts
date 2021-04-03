import { Router } from "express";

import PartnerStoreController from "../controllers/PartnerStoreController";

const partnerStoreRouter = Router();
const partnerStoreController = new PartnerStoreController();

partnerStoreRouter.get("/partner-stores", partnerStoreController.index);

export default partnerStoreRouter;
