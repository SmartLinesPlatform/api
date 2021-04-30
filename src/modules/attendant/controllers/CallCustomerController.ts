import IController from "@utils/interfaces/IController";
import { Request, Response } from "express";

import CallNextCustomerService from "../services/CallNextCustomerService";

class CallCustomerController implements IController {
  async read(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { attendance_line_id, withdraw_line_id } = req.body;

    await CallNextCustomerService.execute({
      attendance_line_id,
      withdraw_line_id,
    });

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

export default CallCustomerController;
