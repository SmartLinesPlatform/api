import IStore from "@entities/interfaces/IStore";
import LineTypesEnum from "@enums/LineTypesEnum";
import StoreTypesEnum from "@enums/StoreTypesEnum";
import AppError from "@errors/AppError";
import ICategoryRepository from "@repositories/interfaces/ICategoryRepository";
import ILineRepository from "@repositories/interfaces/ILineRepository";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";

interface ICreateStoreServiceRequest {
  name: string;
  cnpj: string;
  lat: number;
  lng: number;
  type: StoreTypesEnum;
  categories: string[];
}

interface IConstructor {
  storeRepository: IStoreRepository;
  lineRepository: ILineRepository;
  categoryRepository: ICategoryRepository;
}

class CreateStoreService
  implements IService<IStore, ICreateStoreServiceRequest> {
  private storeRepository: IStoreRepository;
  private lineRepository: ILineRepository;
  private categoryRepository: ICategoryRepository;

  constructor({
    storeRepository,
    lineRepository,
    categoryRepository,
  }: IConstructor) {
    this.storeRepository = storeRepository;
    this.lineRepository = lineRepository;
    this.categoryRepository = categoryRepository;
  }

  public async execute({
    name,
    cnpj,
    lat,
    lng,
    type,
    categories,
  }: ICreateStoreServiceRequest): Promise<IStore> {
    const category = await this.categoryRepository.findById(categories[0]);
    console.log(category);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    const attendanceLine = await this.lineRepository.create({
      orders: [],
      type: LineTypesEnum.ATTENDANCE_LINE,
      store_id: "",
    });

    const withdrawLine = await this.lineRepository.create({
      orders: [],
      type: LineTypesEnum.WITHDRAW_LINE,
      store_id: "",
    });

    const exists = await this.storeRepository.findByCnpj(cnpj);

    if (exists) {
      throw new AppError("Store already exists", 400);
    }

    const store = await this.storeRepository.create({
      name,
      cnpj,
      lat,
      lng,
      type,
      lines: [withdrawLine.id, attendanceLine.id],
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

export default CreateStoreService;
