import IOrderRepository from "@repositories/interfaces/IOrderRepository";
import OrderRepository from "@repositories/OrderRepository";
import { container } from "tsyringe";

container.registerSingleton<IOrderRepository>(
  "OrderRepository",
  OrderRepository
);
