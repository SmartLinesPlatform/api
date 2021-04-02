import CategoryRepository from "@repositories/CategoryRepository";
import ICategoryRepository from "@repositories/interfaces/ICategoryRepository";
import { container } from "tsyringe";

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);
