import IController from "@utils/interfaces/IController";
import { Request, Response } from "express";

import CreateStoreService from "../services/CreateStoreService";
import DeleteStoreService from "../services/DeleteStoreService";
import FindStoreByIdService from "../services/FindStoreByIdService";
import ListStoresService from "../services/ListStoresService";
import UpdateStoreService from "../services/UpdateStoreService";

class StoreController implements IController {
  async read(req: Request, res: Response): Promise<Response> {
    const { storeId } = req.params;
    const store = await FindStoreByIdService.execute(storeId);
    return res.json(store);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const stores = await ListStoresService.execute();
    return res.json(stores);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, cnpj, lat, lng, type, categories } = req.body;
    const store = await CreateStoreService.execute({
      name,
      cnpj,
      lat,
      lng,
      type,
      categories,
    });
    return res.json(store);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { storeId } = req.params;
    const { name, cnpj, lat, lng, type } = req.body;
    await UpdateStoreService.execute({
      id: storeId,
      name,
      cnpj,
      lat,
      lng,
      type,
    });
    return res.json();
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { storeId } = req.params;
    await DeleteStoreService.execute(storeId);
    return res.json();
  }
}

export default StoreController;
