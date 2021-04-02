import OrdersStatusEnum from "@enums/OrdersStatusEnum";
import { Collection } from "fireorm";

import IOrder from "./interfaces/IOrder";

@Collection()
export default class Order implements IOrder {
  id: string;
  store_id: string;
  attendant_id: string;
  customer_id: string;
  status: OrdersStatusEnum;
  concluded_at: Date | null;
  created_at: Date;
  updated_at: Date;
}
