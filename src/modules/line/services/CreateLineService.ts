import ILine from "@entities/interfaces/ILine";
import ILineRepository from "@repositories/interfaces/ILineRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import ICreateLineDTO from "../dtos/ICreateLineDTO";

@injectable()
class CreateLineService implements IService<ILine, ICreateLineDTO> {
  private lineRepository: ILineRepository;

  constructor(@inject("LineRepository") lineRepository: ILineRepository) {
    this.lineRepository = lineRepository;
  }

  public async execute({ store_id, type }: ICreateLineDTO): Promise<ILine> {
    const line = await this.lineRepository.create({
      store_id,
      type,
    });

    return line;
  }
}

export default container.resolve(CreateLineService);
