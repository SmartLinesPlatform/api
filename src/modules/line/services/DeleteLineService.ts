import AppError from "@errors/AppError";
import ILineRepository from "@repositories/interfaces/ILineRepository";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

@injectable()
class DeleteLineService implements IService<void, string> {
  private lineRepository: ILineRepository;
  private storeRepository: IStoreRepository;

  constructor(
    @inject("LineRepository") lineRepository: ILineRepository,
    @inject("StoreRepository") storeRepository: IStoreRepository
  ) {
    this.lineRepository = lineRepository;
    this.storeRepository = storeRepository;
  }

  public async execute(id: string): Promise<void> {
    const line = await this.lineRepository.findById(id);

    if (!line) {
      throw new AppError("Line not found", 404);
    }

    const store = await this.storeRepository.findById(line.store_id);

    if (store) {
      await this.storeRepository.removeLineFromStore(store, line.id);
    }

    await this.lineRepository.delete(line.id);
  }
}

export default container.resolve(DeleteLineService);
