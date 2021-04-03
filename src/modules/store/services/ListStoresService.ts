import IStore from "@entities/interfaces/IStore";
import StoreTypesEnum from "@enums/StoreTypesEnum";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import IListStoresDTO from "../dtos/IListStoresDTO";

@injectable()
class ListStoresService implements IService<IStore[], IListStoresDTO> {
  private storeRepository: IStoreRepository;

  constructor(@inject("StoreRepository") storeRepository: IStoreRepository) {
    this.storeRepository = storeRepository;
  }
  async execute({ partners, restaurants }: IListStoresDTO): Promise<IStore[]> {
    const data: string[] = [];

    if (partners) {
      data.push(StoreTypesEnum.PARTNER);
    }

    if (restaurants) {
      data.push(StoreTypesEnum.RESTAURANT);
    }

    if (data.length === 0) {
      data.push(StoreTypesEnum.PARTNER);
      data.push(StoreTypesEnum.RESTAURANT);
    }

    const stores = await this.storeRepository.listAll(data);
    return stores;
  }
}

export default container.resolve(ListStoresService);
