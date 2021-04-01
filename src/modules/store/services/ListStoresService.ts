import Store from "@entities/Store";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";

class ListStoresService {
  private storeRepository: IStoreRepository;

  constructor(storeRepository: IStoreRepository) {
    this.storeRepository = storeRepository;
  }

  public async execute(): Promise<Store[]> {
    const stores = await this.storeRepository.listAll();
    return stores;
  }
}

export default ListStoresService;
