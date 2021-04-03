import ICategory from "@entities/interfaces/ICategory";
import AppError from "@errors/AppError";
import ICategoryRepository from "@repositories/interfaces/ICategoryRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

@injectable()
class FindCategoryByIdService implements IService<ICategory, string> {
  private categoryRepository: ICategoryRepository;

  constructor(
    @inject("CategoryRepository") categoryRepository: ICategoryRepository
  ) {
    this.categoryRepository = categoryRepository;
  }

  async execute(id: string): Promise<ICategory> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    return category;
  }
}

export default container.resolve(FindCategoryByIdService);
