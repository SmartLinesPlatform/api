import IStore from "@entities/interfaces/IStore";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

@injectable()
class ListStoresService implements IService<IStore[], null> {
  private storeRepository: IStoreRepository;

  constructor(@inject("StoreRepository") storeRepository: IStoreRepository) {
    this.storeRepository = storeRepository;
  }

  public async execute(): Promise<IStore[]> {
    const stores = await this.storeRepository.listAll();
    return stores;
  }
}

export default container.resolve(ListStoresService);
