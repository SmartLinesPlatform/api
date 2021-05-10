import { isInsidePolygon } from "@utils/helpers/Location";
import IController from "@utils/interfaces/IController";
import ICoordinates from "@utils/interfaces/ICoordinates";
import { Request, Response } from "express";

import CreateAreaService from "../services/CreateAreaService";

class AreaController implements IController {
  async read(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { polygon, lat, lng } = req.body;

    const point: ICoordinates = {
      lat: Number(lat),
      lng: Number(lng),
    };

    const isInside = isInsidePolygon(point, polygon);
    return res.json({ isInside });
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { bounds, name } = req.body;
    const area = await CreateAreaService.execute({
      name,
      bounds,
    });
    return res.json(area);
  }

  async update(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async delete(req: Request, res: Response): Promise<Response> {
    return res.json();
  }
}

export default AreaController;
