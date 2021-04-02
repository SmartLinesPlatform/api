import CategoryTypesEnum from "@enums/CategoryTypesEnum";

export default interface ICategory {
  id: string;
  type: CategoryTypesEnum;
  name: string;
  created_at: Date;
  updated_at: Date;
}
