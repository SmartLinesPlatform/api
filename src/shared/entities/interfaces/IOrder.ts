import OrdersStatusEnum from "@enums/OrdersStatusEnum";

export default interface IOrder {
  id: string;
  store_id: string;
  attendant_id: string;
  customer_id: string;
  status: OrdersStatusEnum;
  concluded_at: Date | null;
  created_at: string;
  updated_at: string;
}
