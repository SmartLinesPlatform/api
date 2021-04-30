import IOrder from "@entities/interfaces/IOrder";
import OrdersStatusEnum from "@enums/OrdersStatusEnum";
import AppError from "@errors/AppError";
import ICustomerRepository from "@repositories/interfaces/ICustomerRepository";
import ILineRepository from "@repositories/interfaces/ILineRepository";
import IOrderRepository from "@repositories/interfaces/IOrderRepository";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import IFinishAttendmentDTO from "../dtos/IFinishAttendmentDTO";

@injectable()
class EnterInLineService implements IService<IOrder, IFinishAttendmentDTO> {
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

  public async execute({ store_id }: IFinishAttendmentDTO): Promise<IOrder> {
    const store = await this.storeRepository.findById(store_id);

    if (!store) {
      throw new AppError("Store does not exists", 400);
    }

    const line = await this.lineRepository.findById(store.lines[0]);

    if (!line) {
      throw new AppError("Attendance line does not exists", 400);
    }

    const order_id = line.orders[0];

    if (!order_id) {
      throw new AppError("The line is empty", 404);
    }

    const order = await this.orderRepository.findById(order_id);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    const customer = await this.customerRepository.findById(order.customer_id);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    line.orders.shift();

    customer.is_in_line = false;

    order.status = OrdersStatusEnum.CONCLUDED;
    order.concluded_at = new Date();

    await this.orderRepository.update(order);
    await this.lineRepository.update(line);
    await this.customerRepository.update(customer);

    return order;
  }
}

export default container.resolve(EnterInLineService);
