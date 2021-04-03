import ICategory from "@entities/interfaces/ICategory";
import ICategoryRepository from "@repositories/interfaces/ICategoryRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

@injectable()
class ListCategoriesService implements IService<ICategory[], null> {
  private categoryRepository: ICategoryRepository;

  constructor(
    @inject("CategoryRepository") categoryRepository: ICategoryRepository
  ) {
    this.categoryRepository = categoryRepository;
  }

  public async execute(): Promise<ICategory[]> {
    const categories = await this.categoryRepository.listAll();
    return categories;
  }
}

export default container.resolve(ListCategoriesService);
