import AppError from "@errors/AppError";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import IUpdateStoreDTO from "../dtos/IUpdateStoreDTO";

@injectable()
class UpdateStoreService implements IService<void, IUpdateStoreDTO> {
  private storeRepository: IStoreRepository;

  constructor(@inject("StoreRepository") storeRepository: IStoreRepository) {
    this.storeRepository = storeRepository;
  }

  public async execute({
    id,
    name,
    cnpj,
    lat,
    lng,
    type,
  }: IUpdateStoreDTO): Promise<void> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new AppError("Store not found", 404);
    }

    await this.storeRepository.update({
      id,
      name,
      cnpj,
      lat,
      lng,
      type,
    });
  }
}

export default container.resolve(UpdateStoreService);
