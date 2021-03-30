import OrdersStatusEnum from "@enums/OrdersStatusEnum";

import Attendant from "./Attendant";
import Customer from "./Customer";
import IEntity from "./interfaces/IEntity";

export default interface IOrder extends IEntity {
  store_id: string;
  attendant: Attendant;
  customer: Customer;
  status: OrdersStatusEnum;
  concluded_at: Date | null;
}
