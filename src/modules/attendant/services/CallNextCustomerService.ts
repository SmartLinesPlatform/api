import AppError from "@errors/AppError";
import ILineRepository from "@repositories/interfaces/ILineRepository";
import IOrderRepository from "@repositories/interfaces/IOrderRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import ICallNextCustomerDTO from "../dtos/ICallNextCustomerDTO";

@injectable()
class CallNextCustomerService implements IService<void, ICallNextCustomerDTO> {
  private lineRepository: ILineRepository;
  private orderRepository: IOrderRepository;
  constructor(
    @inject("LineRepository")
    lineRepository: ILineRepository,
    @inject("OrderRepository")
    orderRepository: IOrderRepository
  ) {
    this.lineRepository = lineRepository;
    this.orderRepository = orderRepository;
  }

  public async execute({
    attendance_line_id,
    withdraw_line_id,
    attendant_id,
  }: ICallNextCustomerDTO): Promise<void> {
    const attendanceLine = await this.lineRepository.findById(
      attendance_line_id
    );

    if (!attendanceLine) {
      throw new AppError("Attendance line does not exists", 400);
    }

    const withdrawLine = await this.lineRepository.findById(withdraw_line_id);

    if (!withdrawLine) {
      throw new AppError("Withdraw line does not exists", 400);
    }

    const order_id = attendanceLine.orders.shift();

    if (!order_id) {
      throw new AppError("The line is empty", 404);
    }

    const order = await this.orderRepository.findById(order_id);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    order.attendant_id = attendant_id;
    withdrawLine.orders.push(order.id);

    await this.lineRepository.update(attendanceLine);
    await this.lineRepository.update(withdrawLine);
    await this.orderRepository.update(order);
  }
}

export default container.resolve(CallNextCustomerService);
