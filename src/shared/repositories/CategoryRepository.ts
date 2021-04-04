import Category from "@entities/Category";
import ICategory from "@entities/interfaces/ICategory";
import { getRepository, IRepository } from "fireorm";

import ICategoryRepository, {
  ICreateCategoryRequest,
  IUpdateCategoryRequest,
} from "./interfaces/ICategoryRepository";

class CategoryRepository implements ICategoryRepository {
  private repository: IRepository<ICategory>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async findById(id: string): Promise<ICategory | null> {
    const category = await this.repository.findById(id);

    return category;
  }

  async create({ name, type }: ICreateCategoryRequest): Promise<ICategory> {
    const category = await this.repository.create({
      name,
      type,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return category;
  }

  async update(data: IUpdateCategoryRequest): Promise<void> {
    const updatedData = { ...data, updated_at: new Date() };
    await this.repository.update(updatedData);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  async listAll(): Promise<ICategory[]> {
    const categories = await this.repository.find();
    return categories;
  }
}

export default CategoryRepository;
