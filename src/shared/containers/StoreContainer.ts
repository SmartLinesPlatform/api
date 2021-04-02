import IStoreRepository from "@repositories/interfaces/IStoreRepository";
import StoreRepository from "@repositories/StoreRepository";
import { container } from "tsyringe";

container.registerSingleton<IStoreRepository>(
  "StoreRepository",
  StoreRepository
);
