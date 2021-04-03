import IOrder from "@entities/interfaces/IOrder";
import AppError from "@errors/AppError";
import ICustomerRepository from "@repositories/interfaces/ICustomerRepository";
import ILineRepository from "@repositories/interfaces/ILineRepository";
import IOrderRepository from "@repositories/interfaces/IOrderRepository";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import ICreateCustomerOrderDTO from "../dtos/ICreateCustomerOrderDTO";

@injectable()
class CreateOrderService implements IService<IOrder, ICreateCustomerOrderDTO> {
  private orderRepository: IOrderRepository;
  private storeRepository: IStoreRepository;
  private lineRepository: ILineRepository;
  private customerRepository: ICustomerRepository;

  constructor(
    @inject("OrderRepository")
    orderRepository: IOrderRepository,
    @inject("StoreRepository")
    storeRepository: IStoreRepository,
    @inject("LineRepository")
    lineRepository: ILineRepository,
    @inject("CustomerRepository")
    customerRepository: ICustomerRepository
  ) {
    this.orderRepository = orderRepository;
    this.storeRepository = storeRepository;
    this.lineRepository = lineRepository;
    this.customerRepository = customerRepository;
  }

  public async execute({
    customer_id,
    store_id,
  }: ICreateCustomerOrderDTO): Promise<IOrder> {
    const customer = await this.customerRepository.findById(customer_id);

    if (!customer) {
      throw new AppError("Customer does not exists", 400);
    }

    if (customer.is_in_line) {
      throw new AppError("Customer is already in a line", 400);
    }

    const store = await this.storeRepository.findById(store_id);

    if (!store) {
      throw new AppError("Store does not exists", 400);
    }

    const line = await this.lineRepository.findById(store.lines[0]);

    if (!line) {
      throw new AppError("Attendance line does not exists", 400);
    }

    const order = await this.orderRepository.create({
      customer_id,
      store_id,
    });

    customer.is_in_line = true;

    line.orders.push(order.id);

    await this.lineRepository.update(line);
    await this.customerRepository.update(customer);

    return order;
  }
}

export default container.resolve(CreateOrderService);
