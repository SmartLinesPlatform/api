import IController from "@utils/interfaces/IController";
import { Request, Response } from "express";

import FinishAttendmentService from "../services/FinishAttendmentService";

class FinishAttendmentController implements IController {
  async read(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { store_id } = req.body;

    await FinishAttendmentService.execute({
      store_id,
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

export default FinishAttendmentController;
