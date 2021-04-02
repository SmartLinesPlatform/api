import ICategory from "@entities/Category";
import CategoryTypesEnum from "@enums/CategoryTypesEnum";

export interface ICreateCategoryRequest {
  type: CategoryTypesEnum;
  name: string;
}

export interface IUpdateCategoryRequest {
  id: string;
  type?: CategoryTypesEnum;
  name?: string;
}

export default interface ICategoryRepository {
  create(data: ICreateCategoryRequest): Promise<ICategory>;
  update(data: IUpdateCategoryRequest): Promise<void>;
  delete(id: string): Promise<void>;
  listAll(): Promise<ICategory[]>;
  findById(id: string): Promise<ICategory | null>;
}
