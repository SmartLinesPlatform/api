import IController from "@utils/interfaces/IController";
import ICoordinates from "@utils/interfaces/ICoordinates";
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
    const { partners, restaurants, lat, lng } = req.query;
    const stores = await ListStoresService.execute({
      partners: Boolean(partners),
      restaurants: Boolean(restaurants),
      current_position: {
        lat: Number(lat),
        lng: Number(lng)
      }
    });
    return res.json(stores);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { area_id, name, cnpj, lat, lng, type, categories } = req.body;
    const store = await CreateStoreService.execute({
      area_id,
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
