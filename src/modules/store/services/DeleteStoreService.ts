import AppError from "@errors/AppError";
import ILineRepository from "@repositories/interfaces/ILineRepository";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

@injectable()
class DeleteStoreService implements IService<void, string> {
  private storeRepository: IStoreRepository;
  private lineRepository: ILineRepository;

  constructor(
    @inject("StoreRepository") storeRepository: IStoreRepository,
    @inject("LineRepository") lineRepository: ILineRepository
  ) {
    this.storeRepository = storeRepository;
    this.lineRepository = lineRepository;
  }

  public async execute(id: string): Promise<void> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new AppError("Store not found", 404);
    }

    await this.lineRepository.delete(store.lines.attendance_line_id);
    await this.lineRepository.delete(store.lines.withdraw_line_id);

    await this.storeRepository.delete(store.id);
  }
}

export default container.resolve(DeleteStoreService);
