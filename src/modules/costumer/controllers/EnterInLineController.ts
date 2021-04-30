import IController from "@utils/interfaces/IController";
import { Request, Response } from "express";

import EnterInLineService from "../services/EnterInLineService";

class EnterInLineController implements IController {
  async read(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { store_id, customer_id } = req.body;
    const order = await EnterInLineService.execute({
      store_id,
      customer_id,
    });
    return res.json(order);
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

export default EnterInLineController;
