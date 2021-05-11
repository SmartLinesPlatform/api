import AppError from "@errors/AppError";
import ICustomerRepository from "@repositories/interfaces/ICustomerRepository";
import ILineRepository from "@repositories/interfaces/ILineRepository";
import IOrderRepository from "@repositories/interfaces/IOrderRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

@injectable()
class ShowCustomerPositionInLineService implements IService<number, string> {
  private orderRepository: IOrderRepository;
  private customerRepository: ICustomerRepository;
  private lineRepository: ILineRepository;

  constructor(
    @inject("CustomerRepository") customerRepository: ICustomerRepository,
    @inject("OrderRepository")
    orderRepository: IOrderRepository,
    @inject("LineRepository")
    lineRepository: ILineRepository
  ) {
    this.orderRepository = orderRepository;
    this.customerRepository = customerRepository;
    this.lineRepository = lineRepository;
  }

  async execute(id: string): Promise<number> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    if (!customer.is_in_line) {
      throw new AppError("Customer is not in any line", 400);
    }

    const order = await this.orderRepository.findByCustomerId(customer.id);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    const line = await this.lineRepository.findLineByOrderInside(order.id);

    if (!line) {
      throw new AppError("Line not found", 404);
    }

    const position = line.orders.findIndex((order_id) => order_id === order.id);

    return position;
  }
}

export default container.resolve(ShowCustomerPositionInLineService);
