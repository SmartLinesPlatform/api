import ICustomer from "@entities/interfaces/ICustomer";
import AppError from "@errors/AppError";
import ICustomerRepository from "@repositories/interfaces/ICustomerRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import ICreateCustomerDTO from "../dtos/ICreateCustomerDTO";

@injectable()
class CreateCustomerService implements IService<ICustomer, ICreateCustomerDTO> {
  private customerRepository: ICustomerRepository;

  constructor(
    @inject("CustomerRepository") customerRepository: ICustomerRepository
  ) {
    this.customerRepository = customerRepository;
  }

  public async execute({
    name,
    email,
    password,
  }: ICreateCustomerDTO): Promise<ICustomer> {
    const exists = await this.customerRepository.findByEmail(email);

    if (exists) {
      throw new AppError("Customer already exists", 400);
    }

    const customer = await this.customerRepository.create({
      name,
      email,
      password,
    });

    return customer;
  }
}

export default container.resolve(CreateCustomerService);
