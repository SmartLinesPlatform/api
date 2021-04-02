import IStore from "@entities/interfaces/IStore";
import AppError from "@errors/AppError";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

@injectable()
class FindStoreByIdService implements IService<IStore, string> {
  private storeRepository: IStoreRepository;

  constructor(@inject("StoreRepository") storeRepository: IStoreRepository) {
    this.storeRepository = storeRepository;
  }

  async execute(id: string): Promise<IStore> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new AppError("Store not found", 404);
    }

    return store;
  }
}

export default container.resolve(FindStoreByIdService);
