import Store from "@entities/Store";
import LineTypesEnum from "@enums/LineTypesEnum";
import StoreTypesEnum from "@enums/StoreTypesEnum";
import ILineRepository from "@repositories/interfaces/ILineRepository";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";

interface ICreateStoreServiceRequest {
  name: string;
  cnpj: string;
  lat: number;
  lng: number;
  type: StoreTypesEnum;
}

interface IConstructor {
  storeRepository: IStoreRepository;
  lineRepository: ILineRepository;
}

class CreateStoreService {
  private storeRepository: IStoreRepository;
  private lineRepository: ILineRepository;

  constructor({ storeRepository, lineRepository }: IConstructor) {
    this.storeRepository = storeRepository;
    this.lineRepository = lineRepository;
  }

  public async execute({
    name,
    cnpj,
    lat,
    lng,
    type,
  }: ICreateStoreServiceRequest): Promise<Store> {
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

    const store = await this.storeRepository.create({
      name,
      cnpj,
      lat,
      lng,
      type,
      lines: [withdrawLine.id, attendanceLine.id],
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
