import AppError from "@errors/AppError";
import ILineRepository from "@repositories/interfaces/ILineRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

@injectable()
class DeleteLineService implements IService<void, string> {
  private lineRepository: ILineRepository;

  constructor(@inject("LineRepository") lineRepository: ILineRepository) {
    this.lineRepository = lineRepository;
  }

  public async execute(id: string): Promise<void> {
    const line = await this.lineRepository.findById(id);

    if (!line) {
      throw new AppError("Line not found", 404);
    }
    await this.lineRepository.delete(line.id);
  }
}

export default container.resolve(DeleteLineService);
