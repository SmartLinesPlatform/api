import Area from "@entities/Area";
import IArea from "@entities/interfaces/IArea";
import { getRepository, IRepository } from "fireorm";

import IAreaRepository, {
  ICreateAreaRequest,
  IUpdateAreaRequest,
} from "./interfaces/IAreaRepository";

class AreaRepository implements IAreaRepository {
  private repository: IRepository<IArea>;

  constructor() {
    this.repository = getRepository(Area);
  }

  async findById(id: string): Promise<Area | null> {
    const ads = await this.repository.findById(id);

    return ads;
  }

  async create({ name, bounds }: ICreateAreaRequest): Promise<Area> {
    const area = await this.repository.create({
      name,
      bounds,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return area;
  }
  async update(data: IUpdateAreaRequest): Promise<void> {
    const updatedData = { ...data, updated_at: new Date() };
    await this.repository.update(updatedData);
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  async listAll(): Promise<Area[]> {
    const areas = await this.repository.find();
    return areas;
  }
}

export default AreaRepository;
