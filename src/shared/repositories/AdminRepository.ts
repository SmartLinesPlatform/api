import Admin from "@entities/Admin";
import IAdmin from "@entities/interfaces/IAdmin";
import { getRepository, IRepository } from "fireorm";

import IAdminRepository, {
  ICreateAdminRequest,
  IUpdateAdminRequest,
} from "./interfaces/IAdminRepository";

class AdminRepository implements IAdminRepository {
  private repository: IRepository<IAdmin>;

  constructor() {
    this.repository = getRepository(Admin);
  }

  async findById(id: string): Promise<IAdmin | null> {
    const admin = await this.repository.findById(id);

    return admin;
  }

  async create({
    name,
    email,
    password,
    type,
    store_id,
  }: ICreateAdminRequest): Promise<IAdmin> {
    const admin = await this.repository.create({
      name,
      email,
      password,
      type,
      store_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return admin;
  }

  async update(data: IUpdateAdminRequest): Promise<void> {
    await this.repository.update(data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  async listAll(): Promise<IAdmin[]> {
    const admins = await this.repository.find();
    return admins;
  }
}

export default AdminRepository;
