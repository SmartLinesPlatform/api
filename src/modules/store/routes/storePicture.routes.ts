import uploadConfig from "@config/upload";
import { Router } from "express";
import multer from "multer";

import StorePictureController from "../controllers/StorePictureController";

const upload = multer(uploadConfig);

const storePictureRouter = Router();
const storePictureController = new StorePictureController();

storePictureRouter.get("/picture", storePictureController.index);
storePictureRouter.put(
  "/picture/:storeId",
  upload.single("picture"),
  storePictureController.update
);

export default storePictureRouter;
