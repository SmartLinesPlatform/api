import AppError from "@errors/AppError";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

interface IRequest {
  id: string;
  picture_url: string;
}

@injectable()
class UpdateStoreProfilePictureService implements IService<void, IRequest> {
  private storeRepository: IStoreRepository;

  constructor(@inject("StoreRepository") storeRepository: IStoreRepository) {
    this.storeRepository = storeRepository;
  }

  public async execute({ id, picture_url }: IRequest): Promise<void> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new AppError("Store not found", 404);
    }

    if (!store.picture_url) {
      await this.storeRepository.update({
        id,
        picture_url,
      });
    }

    await this.storeRepository.update({
      id,
      picture_url,
    });
  }
}

export default container.resolve(UpdateStoreProfilePictureService);
