import IStore from "@entities/interfaces/IStore";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";

class ListStoresService implements IService<IStore[], null> {
  private storeRepository: IStoreRepository;

  constructor(storeRepository: IStoreRepository) {
    this.storeRepository = storeRepository;
  }

  public async execute(): Promise<IStore[]> {
    const stores = await this.storeRepository.listAll();
    return stores;
  }
}

export default ListStoresService;
