import IController from "@utils/interfaces/IController";
import { Request, Response } from "express";

import ShowCurrentCustomerPositionInLineService from "../services/ShowCurrentCustomerPositionInLineService";

class CustomerController implements IController {
  async read(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { customer_id } = req.body;
    const position = await ShowCurrentCustomerPositionInLineService.execute(
      customer_id
    );
    return res.json({ position });
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

export default CustomerController;
