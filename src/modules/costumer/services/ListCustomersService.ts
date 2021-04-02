import ICustomer from "@entities/interfaces/ICustomer";
import ICustomerRepository from "@repositories/interfaces/ICustomerRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

@injectable()
class ListCustomersService implements IService<ICustomer[], null> {
  private customerRepository: ICustomerRepository;

  constructor(
    @inject("CustomerRepository") customerRepository: ICustomerRepository
  ) {
    this.customerRepository = customerRepository;
  }

  public async execute(): Promise<ICustomer[]> {
    const customers = await this.customerRepository.listAll();
    return customers;
  }
}

export default container.resolve(ListCustomersService);
