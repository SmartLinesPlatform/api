import Attendant from "@entities/Attendant";
import IAttendant from "@entities/interfaces/IAttendant";
import { getRepository, IRepository } from "fireorm";

import IAttendantRepository, {
  ICreateAttendantRequest,
  IUpdateAttendantRequest,
} from "./interfaces/IAttendantRepository";

class AttendantRepository implements IAttendantRepository {
  private repository: IRepository<IAttendant>;

  constructor() {
    this.repository = getRepository(Attendant);
  }

  async findById(id: string): Promise<IAttendant | null> {
    const attendant = await this.repository.findById(id);

    return attendant;
  }

  async create({
    name,
    email,
    password,
    store_id,
  }: ICreateAttendantRequest): Promise<IAttendant> {
    const attendant = await this.repository.create({
      name,
      email,
      password,
      store_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return attendant;
  }

  async update(data: IUpdateAttendantRequest): Promise<void> {
    await this.repository.update(data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  async listAll(): Promise<IAttendant[]> {
    const attendants = await this.repository.find();
    return attendants;
  }
}

export default AttendantRepository;
