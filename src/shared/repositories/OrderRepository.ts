import IOrder from "@entities/interfaces/IOrder";
import Order from "@entities/Order";
import OrdersStatusEnum from "@enums/OrdersStatusEnum";
import { getRepository, IRepository } from "fireorm";

import IOrderRepository, {
  ICreateOrderRequest,
  IUpdateOrderRequest,
} from "./interfaces/IOrderRepository";

class OrderRepository implements IOrderRepository {
  private repository: IRepository<IOrder>;

  constructor() {
    this.repository = getRepository(Order);
  }

  async findById(id: string): Promise<IOrder | null> {
    const order = await this.repository.findById(id);

    return order;
  }

  async create({
    attendant_id,
    store_id,
    customer_id,
  }: ICreateOrderRequest): Promise<IOrder> {
    const order = await this.repository.create({
      attendant_id,
      store_id,
      customer_id,
      concluded_at: null,
      status: OrdersStatusEnum.IN_PROGRESS,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return order;
  }

  async update(data: IUpdateOrderRequest): Promise<void> {
    await this.repository.update(data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  async listAll(): Promise<IOrder[]> {
    const orders = await this.repository.find();
    return orders;
  }
}

export default OrderRepository;