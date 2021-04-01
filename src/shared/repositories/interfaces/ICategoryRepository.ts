import ICategory from "@entities/Category";
import CategoryTypesEnum from "@enums/CategoryTypesEnum";

export interface ICreateCategoryRequest {
  type: CategoryTypesEnum;
  name: string;
}

export interface IUpdateCategoryRequest {
  type: CategoryTypesEnum;
  name: string;
}

export default interface ILineRepository {
  create(data: ICreateCategoryRequest): Promise<ICategory>;
  update(id: string, data: IUpdateCategoryRequest): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  listAll(): Promise<ICategory[]>;
  findById(id: string): Promise<ICategory | undefined>;
}
