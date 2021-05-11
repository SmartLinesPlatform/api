import IController from "@utils/interfaces/IController";
import { Request, Response } from "express";

import GiveUpPositionInLineService from "../services/GiveUpPositionInLineService";

class GiveUpPositionInLineController implements IController {
  async read(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { customer_id } = req.body;
    await GiveUpPositionInLineService.execute(customer_id);
    return res.json();
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

export default GiveUpPositionInLineController;
