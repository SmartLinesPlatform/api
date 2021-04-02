import AppError from "@errors/AppError";
import ICustomerRepository from "@repositories/interfaces/ICustomerRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

@injectable()
class DeleteCustomerService implements IService<void, string> {
  private customerRepository: ICustomerRepository;

  constructor(
    @inject("CustomerRepository") customerRepository: ICustomerRepository
  ) {
    this.customerRepository = customerRepository;
  }

  public async execute(id: string): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }
    await this.customerRepository.delete(customer.id);
  }
}

export default container.resolve(DeleteCustomerService);
