import ILineRepository from "@repositories/interfaces/ILineRepository";
import LineRepository from "@repositories/LineRepository";
import { container } from "tsyringe";

container.registerSingleton<ILineRepository>("LineRepository", LineRepository);
