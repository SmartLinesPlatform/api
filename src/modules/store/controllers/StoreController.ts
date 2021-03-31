import LineRepository from "@repositories/LineRepository";
import StoreRepository from "@repositories/StoreRepository";
import { Request, Response } from "express";

import CreateStoreService from "../services/CreateStoreService";
import ListStoresService from "../services/ListStoresService";

const storeRepository = new StoreRepository();
const lineRepository = new LineRepository();

class StoreController {
  async index(req: Request, res: Response): Promise<Response> {
    const listStoresService = new ListStoresService(storeRepository);
    const stores = await listStoresService.execute();
    return res.json(stores);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, cnpj, lat, lng, type } = req.body;
    const createStoreService = new CreateStoreService({
      storeRepository,
      lineRepository,
    });
    const store = await createStoreService.execute({
      name,
      cnpj,
      lat,
      lng,
      type,
    });
    return res.json(store);
  }
}

export default StoreController;
