import AppError from "@errors/AppError";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";
import fs from "fs";
import syspath from "path";
import { injectable, inject, container } from "tsyringe";

interface IRequest {
  id: string;
  filename: string;
  path: string;
}

@injectable()
class UpdateStoreProfilePictureService implements IService<void, IRequest> {
  private storeRepository: IStoreRepository;

  constructor(@inject("StoreRepository") storeRepository: IStoreRepository) {
    this.storeRepository = storeRepository;
  }

  public async execute({ id, filename, path }: IRequest): Promise<void> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new AppError("Store not found", 404);
    }

    if (!store.picture_url) {
      await this.storeRepository.update({
        id,
        picture_url: filename,
      });
    } else {
      fs.unlinkSync(syspath.resolve(path, store.picture_url));
      await this.storeRepository.update({
        id,
        picture_url: filename,
      });
    }
  }
}

export default container.resolve(UpdateStoreProfilePictureService);
