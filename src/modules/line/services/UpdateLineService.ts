import AppError from "@errors/AppError";
import ILineRepository from "@repositories/interfaces/ILineRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import IUpdateLineDTO from "../dtos/IUpdateLineDTO";

@injectable()
class UpdateLineService implements IService<void, IUpdateLineDTO> {
  private lineRepository: ILineRepository;

  constructor(@inject("LineRepository") lineRepository: ILineRepository) {
    this.lineRepository = lineRepository;
  }

  public async execute({ id, store_id, type }: IUpdateLineDTO): Promise<void> {
    const line = await this.lineRepository.findById(id);

    if (!line) {
      throw new AppError("Line not found", 404);
    }

    await this.lineRepository.update({
      id,
      store_id,
      type,
    });
  }
}

export default container.resolve(UpdateLineService);
