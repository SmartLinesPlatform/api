import AppError from "@errors/AppError";
import ICustomerRepository from "@repositories/interfaces/ICustomerRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import IUpdateCustomerDTO from "../dtos/IUpdateCustomerDTO";

@injectable()
class UpdateCustomerService implements IService<void, IUpdateCustomerDTO> {
  private customerRepository: ICustomerRepository;

  constructor(
    @inject("CustomerRepository") customerRepository: ICustomerRepository
  ) {
    this.customerRepository = customerRepository;
  }

  public async execute({
    id,
    name,
    email,
    password,
  }: IUpdateCustomerDTO): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    await this.customerRepository.update({
      id,
      name,
      email,
      password,
    });
  }
}

export default container.resolve(UpdateCustomerService);
