import OrdersStatusEnum from "@enums/OrdersStatusEnum";
import AppError from "@errors/AppError";
import ICustomerRepository from "@repositories/interfaces/ICustomerRepository";
import ILineRepository from "@repositories/interfaces/ILineRepository";
import IOrderRepository from "@repositories/interfaces/IOrderRepository";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

@injectable()
class GiveUpPositionInLineService implements IService<void, string> {
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

  public async execute(customer_id: string): Promise<void> {
    const customer = await this.customerRepository.findById(customer_id);

    if (!customer) {
      throw new AppError("Customer does not exists", 400);
    }

    if (!customer.is_in_line) {
      throw new AppError("Customer is not in a line", 400);
    }

    const order = await this.orderRepository.findByCustomerId(customer.id);

    if (!order) {
      throw new AppError("Order does not exists", 400);
    }

    const store = await this.storeRepository.findById(order.store_id);

    if (!store) {
      throw new AppError("Store does not exists", 400);
    }

    const line = await this.lineRepository.findById(
      store.lines.attendance_line_id
    );

    if (!line) {
      throw new AppError("Attendance line does not exists", 400);
    }

    customer.is_in_line = false;

    const lineWithoutOrder = line.orders.filter((item) => item !== order.id);
    line.orders = [...lineWithoutOrder];

    order.status = OrdersStatusEnum.CANCELLED;

    await this.orderRepository.update(order);
    await this.lineRepository.update(line);
    await this.customerRepository.update(customer);
  }
}

export default container.resolve(GiveUpPositionInLineService);
