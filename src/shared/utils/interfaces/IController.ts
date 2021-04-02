import { Request, Response } from "express";

export default interface IController {
  read(req: Request, res: Response): Promise<Response>;
  index(req: Request, res: Response): Promise<Response>;
  create(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
}
