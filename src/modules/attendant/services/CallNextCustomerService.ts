import AppError from "@errors/AppError";
import IAttendantRepository from "@repositories/interfaces/IAttendantRepository";
import ILineRepository from "@repositories/interfaces/ILineRepository";
import IOrderRepository from "@repositories/interfaces/IOrderRepository";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import ICallNextCustomerDTO from "../dtos/ICallNextCustomerDTO";

@injectable()
class CallNextCustomerService implements IService<void, ICallNextCustomerDTO> {
  private lineRepository: ILineRepository;
  private orderRepository: IOrderRepository;
  private storeRepository: IStoreRepository;
  private attendantRepository: IAttendantRepository;
  constructor(
    @inject("LineRepository")
    lineRepository: ILineRepository,
    @inject("OrderRepository")
    orderRepository: IOrderRepository,
    @inject("StoreRepository")
    storeRepository: IStoreRepository,
    @inject("AttendantRepository")
    attendantRepository: IAttendantRepository
  ) {
    this.lineRepository = lineRepository;
    this.orderRepository = orderRepository;
    this.attendantRepository = attendantRepository;
    this.storeRepository = storeRepository;
  }

  public async execute({
    attendant_id,
  }: ICallNextCustomerDTO): Promise<void> {
    const attendant = await this.attendantRepository.findById(
      attendant_id
    );

    if (!attendant) {
      throw new AppError("Attendant does not exists", 400);
    }

    const store = await this.storeRepository.findById(
      attendant.store_id
    );

    if (!store) {
      throw new AppError("Store does not exists", 400);
    }

    const attendanceLine = await this.lineRepository.findById(
      store.lines.attendance_line_id
    );

    if (!attendanceLine) {
      throw new AppError("Attendance line does not exists", 400);
    }

    const withdrawLine = await this.lineRepository.findById(
      store.lines.withdraw_line_id
    );

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

    order.attendant_id = attendant.id;
    withdrawLine.orders.push(order.id);

    await this.lineRepository.update(attendanceLine);
    await this.lineRepository.update(withdrawLine);
    await this.orderRepository.update(order);
  }
}

export default container.resolve(CallNextCustomerService);
