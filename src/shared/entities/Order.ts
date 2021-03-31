import OrdersStatusEnum from "@enums/OrdersStatusEnum";

import IEntity from "./interfaces/IEntity";

export default interface IOrder extends IEntity {
  store_id: string;
  attendant_id: string;
  customer_id: string;
  status: OrdersStatusEnum;
  concluded_at: Date | null;
}
