import Customer from "@entities/Customer";
import ICustomer from "@entities/interfaces/ICustomer";
import { getRepository, IRepository } from "fireorm";

import ICustomerRepository, {
  ICreateCustomerRequest,
  IUpdateCustomerRequest,
} from "./interfaces/ICustomerRepository";

class CustomerRepository implements ICustomerRepository {
  private repository: IRepository<ICustomer>;

  constructor() {
    this.repository = getRepository(Customer);
  }

  async findById(id: string): Promise<ICustomer | null> {
    const customer = await this.repository.findById(id);
    return customer;
  }

  async create({
    name,
    email,
    password,
  }: ICreateCustomerRequest): Promise<ICustomer> {
    const customer = await this.repository.create({
      name,
      email,
      password,
      coordinates: {
        lat: 0,
        lng: 0,
      },
      favorites_categories: [],
      is_in_line: false,
      profile_picture: null,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return customer;
  }

  async update(data: IUpdateCustomerRequest): Promise<void> {
    await this.repository.update(data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async listAll(): Promise<ICustomer[]> {
    const customers = await this.repository.find();
    return customers;
  }
}

export default CustomerRepository;
