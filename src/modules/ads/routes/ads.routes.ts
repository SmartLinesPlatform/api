import uploadConfig from "@config/upload";
import { Router } from "express";
import multer from "multer";

import AdsController from "../controllers/AdsController";

const upload = multer(uploadConfig);

const adsRouter = Router();
const adsController = new AdsController();

adsRouter.get("/", adsController.index);
adsRouter.post("/", upload.single("banner"), adsController.create);

export default adsRouter;
