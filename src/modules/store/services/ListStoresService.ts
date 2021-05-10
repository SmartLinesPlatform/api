import Area from "@entities/Area";
import IStore from "@entities/interfaces/IStore";
import StoreTypesEnum from "@enums/StoreTypesEnum";
import AppError from "@errors/AppError";
import IAreaRepository from "@repositories/interfaces/IAreaRepository";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import { isInsidePolygon } from "@utils/helpers/Location";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import IListStoresDTO from "../dtos/IListStoresDTO";

@injectable()
class ListStoresService implements IService<IStore[], IListStoresDTO> {
  private storeRepository: IStoreRepository;
  private areaRepository: IAreaRepository;

  constructor(@inject("StoreRepository") storeRepository: IStoreRepository, @inject("AreaRepository") areaRepository: IAreaRepository) {
    this.storeRepository = storeRepository;
    this.areaRepository = areaRepository;
  }
  async execute({ partners, restaurants, current_position }: IListStoresDTO): Promise<IStore[]> {
    const types: string[] = [];

    const areas = await this.areaRepository.listAll();

    let area: Area | null = null;

    for (const item of areas) {
      const isInside = isInsidePolygon(current_position, item.bounds);

      if (isInside) {
        area = item;
        break;
      }
    }

    if (!area) {
      console.log(area);
      throw new AppError("Customer is not inside any Area", 400);
    }

    if (partners) {
      types.push(StoreTypesEnum.PARTNER);
    }

    if (restaurants) {
      types.push(StoreTypesEnum.RESTAURANT);
    }

    if (types.length === 0) {
      types.push(StoreTypesEnum.PARTNER);
      types.push(StoreTypesEnum.RESTAURANT);
    }

    const stores = await this.storeRepository.listAll({ types, area_id: area.id });
    return stores;
  }
}

export default container.resolve(ListStoresService);
