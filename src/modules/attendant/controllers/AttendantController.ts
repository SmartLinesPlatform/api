import IController from "@utils/interfaces/IController";
import { Request, Response } from "express";

import CreateAttendantService from "../services/CreateAttendantService";

class AttendantController implements IController {
  async read(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async index(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, store_id } = req.body;
    const attendant = await CreateAttendantService.execute({
      name,
      email,
      password,
      store_id,
    });
    return res.json(attendant);
  }

  async update(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async delete(req: Request, res: Response): Promise<Response> {
    return res.json();
  }
}

export default AttendantController;
