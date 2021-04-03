import ILine from "@entities/interfaces/ILine";
import AppError from "@errors/AppError";
import ILineRepository from "@repositories/interfaces/ILineRepository";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import ICreateLineDTO from "../dtos/ICreateLineDTO";

@injectable()
class CreateLineService implements IService<ILine, ICreateLineDTO> {
  private lineRepository: ILineRepository;
  private storeRepository: IStoreRepository;

  constructor(
    @inject("LineRepository") lineRepository: ILineRepository,
    @inject("StoreRepository") storeRepository: IStoreRepository
  ) {
    this.lineRepository = lineRepository;
    this.storeRepository = storeRepository;
  }

  public async execute({ store_id, type }: ICreateLineDTO): Promise<ILine> {
    const store = await this.storeRepository.findById(store_id);

    if (!store) {
      throw new AppError("Store not found", 404);
    }

    const line = await this.lineRepository.create({
      store_id,
      type,
    });

    await this.storeRepository.insertLineInStore(store, line.id);

    return line;
  }
}

export default container.resolve(CreateLineService);
