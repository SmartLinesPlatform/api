import AppError from "@errors/AppError";
import ICustomerRepository from "@repositories/interfaces/ICustomerRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import IUpdateCustomerDTO from "../dtos/IUpdateCustomerDTO";

@injectable()
class UpdateCustomerService implements IService<void, IUpdateCustomerDTO> {
  private storeRepository: ICustomerRepository;

  constructor(
    @inject("CustomerRepository") storeRepository: ICustomerRepository
  ) {
    this.storeRepository = storeRepository;
  }

  public async execute({
    id,
    name,
    email,
    password,
  }: IUpdateCustomerDTO): Promise<void> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new AppError("Customer not found", 404);
    }

    await this.storeRepository.update({
      id,
      name,
      email,
      password,
    });
  }
}

export default container.resolve(UpdateCustomerService);
