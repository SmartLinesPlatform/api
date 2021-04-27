import IController from "@utils/interfaces/IController";
import { Request, Response } from "express";

import UpdateStoreProfilePictureService from "../services/UpdateStoreProfilePictureService";

class StorePictureController implements IController {
  async read(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async index(req: Request, res: Response): Promise<Response> {
    return res.json({ msg: "Store pic controller" });
  }

  async create(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { storeId } = req.params;
    const { file } = req;

    await UpdateStoreProfilePictureService.execute({
      id: storeId,
      filename: file.filename,
      path: file.destination,
    });
    return res.json();
  }

  async delete(req: Request, res: Response): Promise<Response> {
    return res.json();
  }
}

export default StorePictureController;
