import AreaRepository from "@repositories/AreaRepository";
import IAreaRepository from "@repositories/interfaces/IAreaRepository";
import { container } from "tsyringe";

container.registerSingleton<IAreaRepository>(
  "AreaRepository",
  AreaRepository
);
