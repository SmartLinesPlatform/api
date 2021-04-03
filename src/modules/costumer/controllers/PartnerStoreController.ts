import IController from "@utils/interfaces/IController";
import { Request, Response } from "express";

import ListPartnerStoresService from "../services/ListPartnerStoresService";

class PartnerStoreController implements IController {
  async read(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async index(req: Request, res: Response): Promise<Response> {
    const customers = await ListPartnerStoresService.execute();
    return res.json(customers);
  }

  async create(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async update(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async delete(req: Request, res: Response): Promise<Response> {
    return res.json();
  }
}

export default PartnerStoreController;
