import ICustomer from "@entities/interfaces/ICustomer";
import AppError from "@errors/AppError";
import ICustomerRepository from "@repositories/interfaces/ICustomerRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

@injectable()
class FindCustomerByIdService implements IService<ICustomer, string> {
  private customerRepository: ICustomerRepository;

  constructor(
    @inject("CustomerRepository") customerRepository: ICustomerRepository
  ) {
    this.customerRepository = customerRepository;
  }

  async execute(id: string): Promise<ICustomer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    return customer;
  }
}

export default container.resolve(FindCustomerByIdService);
