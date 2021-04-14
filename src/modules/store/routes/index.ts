import { Router } from "express";

import storeRouter from "./store.routes";
import storePictureRouter from "./storePicture.routes";

const router = Router();

router.use(storePictureRouter);
router.use(storeRouter);

export default router;
