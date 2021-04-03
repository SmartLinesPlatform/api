import ILine from "@entities/interfaces/ILine";
import Line from "@entities/Line";
import { getRepository, IRepository } from "fireorm";

import ILineRepository, {
  ICreateLineRequest,
  IUpdateLineRequest,
} from "./interfaces/ILineRepository";

class LineRepository implements ILineRepository {
  private repository: IRepository<ILine>;

  constructor() {
    this.repository = getRepository(Line);
  }

  async findById(id: string): Promise<ILine | null> {
    const line = await this.repository.findById(id);
    return line;
  }

  async create({ store_id, type }: ICreateLineRequest): Promise<ILine> {
    const line = await this.repository.create({
      store_id,
      orders: [],
      type,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return line;
  }
  async update(data: IUpdateLineRequest): Promise<void> {
    const updatedData = { ...data, updated_at: new Date() };
    await this.repository.update(updatedData);
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  async listAll(): Promise<ILine[]> {
    const lines = await this.repository.find();
    return lines;
  }
}

export default LineRepository;
