import OrdersStatusEnum from "@enums/OrdersStatusEnum";

export default interface IOrder {
  id: string;
  store_id: string;
  attendant_id: string | null;
  customer_id: string;
  status: OrdersStatusEnum;
  concluded_at: Date | null;
  created_at: Date;
  updated_at: Date;
}
