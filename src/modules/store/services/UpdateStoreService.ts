import StoreTypesEnum from "@enums/StoreTypesEnum";
import AppError from "@errors/AppError";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";

interface IUpdateStoreServiceRequest {
  id: string;
  name: string;
  cnpj: string;
  lat: number;
  lng: number;
  type: StoreTypesEnum;
}

class UpdateStoreService {
  private storeRepository: IStoreRepository;

  constructor(storeRepository: IStoreRepository) {
    this.storeRepository = storeRepository;
  }

  public async execute({
    id,
    name,
    cnpj,
    lat,
    lng,
    type,
  }: IUpdateStoreServiceRequest): Promise<void> {
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

export default UpdateStoreService;
