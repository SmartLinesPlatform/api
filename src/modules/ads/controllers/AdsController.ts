import IController from "@utils/interfaces/IController";
import { Request, Response } from "express";

import CreateAdsService from "../services/CreateAdsService";
import ListAdsService from "../services/ListAdsService";

class AdsController implements IController {
  async read(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { all, store_id } = req.query;
    const ads = await ListAdsService.execute({
      all: Boolean(all),
      store_id: store_id ? String(store_id) : store_id,
    });
    return res.json(ads);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { title, description, store_id } = req.body;
    const { file } = req;

    const ads = await CreateAdsService.execute({
      file,
      title,
      description,
      store_id,
    });

    return res.json(ads);
  }

  async update(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async delete(req: Request, res: Response): Promise<Response> {
    return res.json();
  }
}

export default AdsController;
