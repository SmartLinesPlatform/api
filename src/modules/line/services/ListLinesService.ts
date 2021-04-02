import ILine from "@entities/interfaces/ILine";
import ILineRepository from "@repositories/interfaces/ILineRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

@injectable()
class ListLinesService implements IService<ILine[], null> {
  private lineRepository: ILineRepository;

  constructor(@inject("LineRepository") lineRepository: ILineRepository) {
    this.lineRepository = lineRepository;
  }

  public async execute(): Promise<ILine[]> {
    const lines = await this.lineRepository.listAll();
    return lines;
  }
}

export default container.resolve(ListLinesService);
