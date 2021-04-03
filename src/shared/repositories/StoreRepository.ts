import IStore from "@entities/interfaces/IStore";
import Store from "@entities/Store";
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
    const updatedData = { ...data, updated_at: new Date() }
    await this.repository.update(updatedData);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async listAll(): Promise<IStore[]> {
    const stores = await this.repository.find();
    return stores;
  }
}

export default StoreRepository;
