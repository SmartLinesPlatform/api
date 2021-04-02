import ILine from "@entities/interfaces/ILine";
import AppError from "@errors/AppError";
import ILineRepository from "@repositories/interfaces/ILineRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

@injectable()
class FindLineByIdService implements IService<ILine, string> {
  private lineRepository: ILineRepository;

  constructor(@inject("LineRepository") lineRepository: ILineRepository) {
    this.lineRepository = lineRepository;
  }

  async execute(id: string): Promise<ILine> {
    const line = await this.lineRepository.findById(id);

    if (!line) {
      throw new AppError("Line not found", 404);
    }

    return line;
  }
}

export default container.resolve(FindLineByIdService);
