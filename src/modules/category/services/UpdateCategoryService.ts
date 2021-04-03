import AppError from "@errors/AppError";
import ICategoryRepository from "@repositories/interfaces/ICategoryRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import IUpdateCategoryDTO from "../dtos/IUpdateCategoryDTO";

@injectable()
class UpdateCategoryService implements IService<void, IUpdateCategoryDTO> {
  private categoryRepository: ICategoryRepository;

  constructor(
    @inject("CategoryRepository") categoryRepository: ICategoryRepository
  ) {
    this.categoryRepository = categoryRepository;
  }

  public async execute({ id, name, type }: IUpdateCategoryDTO): Promise<void> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    await this.categoryRepository.update({
      id,
      name,
      type,
    });
  }
}

export default container.resolve(UpdateCategoryService);
