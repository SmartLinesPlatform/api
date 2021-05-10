import IStore from "@entities/interfaces/IStore";
import LineTypesEnum from "@enums/LineTypesEnum";
import AppError from "@errors/AppError";
import IAreaRepository from "@repositories/interfaces/IAreaRepository";
import ICategoryRepository from "@repositories/interfaces/ICategoryRepository";
import ILineRepository from "@repositories/interfaces/ILineRepository";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import ICreateStoreDTO from "../dtos/ICreateStoreDTO";

@injectable()
class CreateStoreService implements IService<IStore, ICreateStoreDTO> {
  private storeRepository: IStoreRepository;
  private lineRepository: ILineRepository;
  private categoryRepository: ICategoryRepository;
  private areaRepository: IAreaRepository;

  constructor(
    @inject("StoreRepository") storeRepository: IStoreRepository,
    @inject("LineRepository") lineRepository: ILineRepository,
    @inject("CategoryRepository") categoryRepository: ICategoryRepository,
    @inject("AreaRepository") areaRepository: IAreaRepository

  ) {
    this.storeRepository = storeRepository;
    this.lineRepository = lineRepository;
    this.categoryRepository = categoryRepository;
    this.areaRepository = areaRepository;
  }

  public async execute({
    area_id,
    name,
    cnpj,
    lat,
    lng,
    type,
    categories,
  }: ICreateStoreDTO): Promise<IStore> {
    const area = await this.areaRepository.findById(area_id);

    if (!area) {
      throw new AppError("Area not found", 404);
    }

    const category = await this.categoryRepository.findById(categories[0]);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    const attendanceLine = await this.lineRepository.create({
      type: LineTypesEnum.ATTENDANCE_LINE,
      store_id: "",
    });

    const withdrawLine = await this.lineRepository.create({
      type: LineTypesEnum.WITHDRAW_LINE,
      store_id: "",
    });

    const exists = await this.storeRepository.findByCnpj(cnpj);

    if (exists) {
      throw new AppError("Store already exists", 400);
    }

    const store = await this.storeRepository.create({
      area_id,
      name,
      cnpj,
      lat,
      lng,
      type,
      lines: {
        attendance_line_id: attendanceLine.id,
        withdraw_line_id: withdrawLine.id
      },
      categories: [category.id],
    });

    await this.lineRepository.update({
      id: attendanceLine.id,
      store_id: store.id,
    });

    await this.lineRepository.update({
      id: withdrawLine.id,
      store_id: store.id,
    });

    return store;
  }
}

export default container.resolve(CreateStoreService);
