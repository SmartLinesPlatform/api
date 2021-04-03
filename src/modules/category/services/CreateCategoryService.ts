import ICategory from "@entities/interfaces/ICategory";
import ICategoryRepository from "@repositories/interfaces/ICategoryRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import ICreateCategoryDTO from "../dtos/ICreateCategoryDTO";

@injectable()
class CreateCategoryService implements IService<ICategory, ICreateCategoryDTO> {
  private categoryRepository: ICategoryRepository;

  constructor(
    @inject("CategoryRepository") categoryRepository: ICategoryRepository
  ) {
    this.categoryRepository = categoryRepository;
  }

  public async execute({ name, type }: ICreateCategoryDTO): Promise<ICategory> {
    const category = await this.categoryRepository.create({
      name,
      type,
    });

    return category;
  }
}

export default container.resolve(CreateCategoryService);
