import AppError from "@errors/AppError";
import ILineRepository from "@repositories/interfaces/ILineRepository";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";

interface IConstructor {
  storeRepository: IStoreRepository;
  lineRepository: ILineRepository;
}

class DeleteStoreService implements IService<void, string> {
  private storeRepository: IStoreRepository;
  private lineRepository: ILineRepository;

  constructor({ storeRepository, lineRepository }: IConstructor) {
    this.storeRepository = storeRepository;
    this.lineRepository = lineRepository;
  }

  public async execute(id: string): Promise<void> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new AppError("Store not found", 404);
    }

    await this.lineRepository.delete(store.lines[0]);
    await this.lineRepository.delete(store.lines[1]);
    await this.storeRepository.delete(store.id);
  }
}

export default DeleteStoreService;
