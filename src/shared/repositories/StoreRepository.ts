import IStore from "@entities/interfaces/IStore";
import Store from "@entities/Store";
import StoreTypesEnum from "@enums/StoreTypesEnum";
import { getRepository, IRepository } from "fireorm";

import IStoreRepository, {
  ICreateStoreRequest,
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

  async insertLineInStore(store: IStore, line_id: string): Promise<void> {
    store.lines.push(line_id);
    const updatedData = { ...store, updated_at: new Date() };
    await this.repository.update(updatedData);
  }

  async removeLineFromStore(store: IStore, line_id: string): Promise<void> {
    const lines = store.lines.filter((line) => line !== line_id);
    const updatedData = { ...store, lines, updated_at: new Date() };
    await this.repository.update(updatedData);
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
    name,
    cnpj,
    lat,
    lng,
    type,
    lines,
    categories,
  }: ICreateStoreRequest): Promise<IStore> {
    const store = await this.repository.create({
      name,
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

  async listAll(data: string[]): Promise<IStore[]> {
    const stores = await this.repository.whereIn("type", data).find();
    return stores;
  }
}

export default StoreRepository;
