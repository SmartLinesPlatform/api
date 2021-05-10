import IStore from "@entities/interfaces/IStore";
import Store from "@entities/Store";
import StoreTypesEnum from "@enums/StoreTypesEnum";
import { getRepository, IRepository } from "fireorm";

import IStoreRepository, {
  ICreateStoreRequest,
  IListAllStoresRequest,
  IUpdateStoreRequest,
} from "./interfaces/IStoreRepository";

class StoreRepository implements IStoreRepository {
  private repository: IRepository<IStore>;

  constructor() {
    this.repository = getRepository(Store);
  }

  async listPartnerStores(): Promise<IStore[]> {
    const stores = await this.repository
      .whereEqualTo("type", StoreTypesEnum.PARTNER)
      .find();
    return stores;
  }

  async findById(id: string): Promise<IStore | null> {
    const store = await this.repository.findById(id);
    return store;
  }

  async findByCnpj(cnpj: string): Promise<IStore | null> {
    const store = await this.repository
      .whereEqualTo((store) => store.cnpj, cnpj)
      .findOne();

    return store;
  }

  async create({
    area_id,
    name,
    cnpj,
    lat,
    lng,
    type,
    lines,
    categories,
  }: ICreateStoreRequest): Promise<IStore> {
    const store = await this.repository.create({
      area_id,
      name,
      picture_url: "",
      cnpj,
      coordinates: { lat, lng },
      type,
      lines,
      categories,
      admins: [],
      ads: [],
      attendants: [],
      created_at: new Date(),
      updated_at: new Date(),
    });

    return store;
  }

  async update(data: IUpdateStoreRequest): Promise<void> {
    const updatedData = { ...data, updated_at: new Date() };
    await this.repository.update(updatedData);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async listAll({ types, area_id }: IListAllStoresRequest): Promise<IStore[]> {
    const stores = await this.repository
      .whereIn("type", types)
      .whereEqualTo("area_id", area_id)
      .find();
    return stores;
  }
}

export default StoreRepository;
