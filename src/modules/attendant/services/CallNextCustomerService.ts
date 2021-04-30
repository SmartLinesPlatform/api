import IOrder from "@entities/interfaces/IOrder";
import AppError from "@errors/AppError";
import ICustomerRepository from "@repositories/interfaces/ICustomerRepository";
import ILineRepository from "@repositories/interfaces/ILineRepository";
import IOrderRepository from "@repositories/interfaces/IOrderRepository";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import ICallNextCustomerDTO from "../dtos/ICallNextCustomerDTO";

@injectable()
class CallNextCustomerService implements IService<void, ICallNextCustomerDTO> {
  private lineRepository: ILineRepository;

  constructor(
    @inject("LineRepository")
    lineRepository: ILineRepository
  ) {
    this.lineRepository = lineRepository;
  }

  public async execute({
    attendance_line_id,
    withdraw_line_id,
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

    const firstOrder = attendanceLine.orders.shift();

    if (!firstOrder) {
      throw new AppError("The line is empty", 404);
    }

    withdrawLine.orders.push(firstOrder);

    await this.lineRepository.update(attendanceLine);
    await this.lineRepository.update(withdrawLine);
  }
}

export default container.resolve(CallNextCustomerService);
