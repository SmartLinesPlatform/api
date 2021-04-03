import { Router } from "express";

import CategoryController from "../controllers/CategoryController";

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.get("/", categoryController.index);
categoryRouter.post("/", categoryController.create);
categoryRouter.get("/:categoryId", categoryController.read);
categoryRouter.put("/:categoryId", categoryController.update);
categoryRouter.delete("/:categoryId", categoryController.delete);

export default categoryRouter;
