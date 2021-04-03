import IController from "@utils/interfaces/IController";
import { Request, Response } from "express";

import CreateOrderService from "../services/CreateOrderService";

class OrderController implements IController {
  async read(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async index(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { store_id, customer_id } = req.body;
    const order = await CreateOrderService.execute({
      store_id,
      customer_id,
    });
    return res.json(order);
  }

  async update(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async delete(req: Request, res: Response): Promise<Response> {
    return res.json();
  }
}

export default OrderController;
