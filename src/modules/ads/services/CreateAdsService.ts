import IAds from "@entities/interfaces/IAds";
import AppError from "@errors/AppError";
import IAdsRepository from "@repositories/interfaces/IAdsRepository";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import ICreateAdsDTO from "../dtos/ICreateAdsDTO";

@injectable()
class CreateAdsService implements IService<IAds, ICreateAdsDTO> {
  private storeRepository: IStoreRepository;
  private adsRepository: IAdsRepository;

  constructor(
    @inject("StoreRepository") storeRepository: IStoreRepository,
    @inject("AdsRepository") adsRepository: IAdsRepository
  ) {
    this.storeRepository = storeRepository;
    this.adsRepository = adsRepository;
  }

  public async execute({
    title,
    description,
    file,
    store_id,
  }: ICreateAdsDTO): Promise<IAds> {
    const store = await this.storeRepository.findById(store_id);

    if (!store) {
      throw new AppError("Store not found", 404);
    }

    const ads = await this.adsRepository.create({
      author_id: "CRIAR AUTHENTIÇAO",
      banner_url: file.filename,
      isActive: true,
      description,
      store_id: store.id,
      title,
    });

    store.ads.push(ads.id);

    await this.storeRepository.update(store);

    return ads;
  }
}

export default container.resolve(CreateAdsService);
