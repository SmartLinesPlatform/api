import Store from "@entities/Store";
import Repository from "@repositories/interfaces/IStoreRepository";

class ListStoresService {
  private repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  public async execute(): Promise<Store[]> {
    const stores = await this.repository.listAll();
    return stores;
  }
}

export default ListStoresService;
