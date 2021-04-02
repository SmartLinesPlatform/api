import CustomerRepository from "@repositories/CustomerRepository";
import ICustomerRepository from "@repositories/interfaces/ICustomerRepository";
import { container } from "tsyringe";

container.registerSingleton<ICustomerRepository>(
  "CustomerRepository",
  CustomerRepository
);
