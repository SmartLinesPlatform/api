import IStore from "@entities/interfaces/IStore";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

@injectable()
class ListPartnerStoresService implements IService<IStore[], null> {
  private partnerStoreRepository: IStoreRepository;

  constructor(
    @inject("StoreRepository") partnerStoreRepository: IStoreRepository
  ) {
    this.partnerStoreRepository = partnerStoreRepository;
  }

  public async execute(): Promise<IStore[]> {
    const partnerStores = await this.partnerStoreRepository.listPartnerStores();
    return partnerStores;
  }
}

export default container.resolve(ListPartnerStoresService);
