import IOrder from "@entities/Order";
import OrdersStatusEnum from "@enums/OrdersStatusEnum";

export interface ICreateOrderRequest {
  store_id: string;
  customer_id: string;
}

export interface IUpdateOrderRequest {
  id: string;
  store_id?: string;
  attendant_id?: string | null;
  customer_id?: string;
  status?: OrdersStatusEnum;
}

export default interface IOrderRepository {
  create(data: ICreateOrderRequest): Promise<IOrder>;
  update(data: IUpdateOrderRequest): Promise<void>;
  delete(id: string): Promise<void>;
  listAll(): Promise<IOrder[]>;
  findById(id: string): Promise<IOrder | null>;
}
