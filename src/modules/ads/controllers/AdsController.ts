import IController from "@utils/interfaces/IController";
import { Request, Response } from "express";

import CreateAdsService from "../services/CreateAdsService";

class AdsController implements IController {
  async read(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async index(req: Request, res: Response): Promise<Response> {
    return res.json();
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
