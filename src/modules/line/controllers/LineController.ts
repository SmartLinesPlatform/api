import IController from "@utils/interfaces/IController";
import { Request, Response } from "express";

import FindLineByIdService from "../services/FindLineByIdService";
import ListLinesService from "../services/ListLinesService";
import UpdateLineService from "../services/UpdateLineService";

class LineController implements IController {
  async read(req: Request, res: Response): Promise<Response> {
    const { lineId } = req.params;
    const line = await FindLineByIdService.execute(lineId);
    return res.json(line);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const lines = await ListLinesService.execute();
    return res.json(lines);
  }

  async create(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { lineId } = req.params;
    const { store_id, type } = req.body;

    await UpdateLineService.execute({
      id: lineId,
      store_id,
      type,
    });
    return res.json();
  }

  async delete(req: Request, res: Response): Promise<Response> {
    return res.json();
  }
}

export default LineController;
