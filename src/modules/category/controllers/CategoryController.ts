import IController from "@utils/interfaces/IController";
import { Request, Response } from "express";

import CreateCategoryService from "../services/CreateCategoryService";
import DeleteCategoryService from "../services/DeleteCategoryService";
import FindCategoryByIdService from "../services/FindCategoryByIdService";
import ListCategoriesService from "../services/ListCategoriesService";
import UpdateCategoryService from "../services/UpdateCategoryService";

class CategoryController implements IController {
  async read(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.params;
    const category = await FindCategoryByIdService.execute(categoryId);
    return res.json(category);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const categorys = await ListCategoriesService.execute();
    return res.json(categorys);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, type } = req.body;
    const category = await CreateCategoryService.execute({
      name,
      type,
    });
    return res.json(category);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.params;
    const { name, type } = req.body;

    await UpdateCategoryService.execute({
      id: categoryId,
      name,
      type,
    });
    return res.json();
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.params;
    await DeleteCategoryService.execute(categoryId);
    return res.json();
  }
}

export default CategoryController;
