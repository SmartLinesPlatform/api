import IAds from "@entities/interfaces/IAds";
import IAdsRepository from "@repositories/interfaces/IAdsRepository";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import IListAdsDTO from "../dtos/IListAdsDTO";

@injectable()
class ListAdsService implements IService<IAds[], IListAdsDTO> {
  private storeRepository: IStoreRepository;
  private adsRepository: IAdsRepository;

  constructor(
    @inject("StoreRepository") storeRepository: IStoreRepository,
    @inject("AdsRepository") adsRepository: IAdsRepository
  ) {
    this.storeRepository = storeRepository;
    this.adsRepository = adsRepository;
  }
  async execute({ all = false, store_id }: IListAdsDTO): Promise<IAds[]> {
    const ads = await this.adsRepository.listAll({ all, store_id });
    return ads;
  }
}

export default container.resolve(ListAdsService);
