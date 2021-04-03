import AppError from "@errors/AppError";
import ICategoryRepository from "@repositories/interfaces/ICategoryRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

@injectable()
class DeleteCategoryService implements IService<void, string> {
  private categoryRepository: ICategoryRepository;

  constructor(
    @inject("CategoryRepository") categoryRepository: ICategoryRepository
  ) {
    this.categoryRepository = categoryRepository;
  }

  public async execute(id: string): Promise<void> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new AppError("Category not found", 404);
    }
    await this.categoryRepository.delete(category.id);
  }
}

export default container.resolve(DeleteCategoryService);
