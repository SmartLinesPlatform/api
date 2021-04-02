import CategoryRepository from "@repositories/CategoryRepository";
import LineRepository from "@repositories/LineRepository";
import StoreRepository from "@repositories/StoreRepository";
import IController from "@utils/interfaces/IController";
import { Request, Response } from "express";

import CreateStoreService from "../services/CreateStoreService";
import DeleteStoreService from "../services/DeleteStoreService";
import FindStoreByIdService from "../services/FindStoreByIdService";
import ListStoresService from "../services/ListStoresService";
import UpdateStoreService from "../services/UpdateStoreService";

const storeRepository = new StoreRepository();
const lineRepository = new LineRepository();
const categoryRepository = new CategoryRepository();

class StoreController implements IController {
  async read(req: Request, res: Response): Promise<Response> {
    const { storeId } = req.params;
    const findStoreByIdService = new FindStoreByIdService(storeRepository);
    const store = await findStoreByIdService.execute(storeId);
    return res.json(store);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const listStoresService = new ListStoresService(storeRepository);
    const stores = await listStoresService.execute();
    return res.json(stores);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, cnpj, lat, lng, type, categories } = req.body;
    const createStoreService = new CreateStoreService({
      storeRepository,
      lineRepository,
      categoryRepository,
    });
    const store = await createStoreService.execute({
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
    const updateStoreService = new UpdateStoreService(storeRepository);
    await updateStoreService.execute({
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
    const deleteStoreService = new DeleteStoreService({
      storeRepository,
      lineRepository,
    });
    await deleteStoreService.execute(storeId);
    return res.json();
  }
}

export default StoreController;
