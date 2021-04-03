import CategoryTypesEnum from "@enums/CategoryTypesEnum";

export default interface ICreateCategoryDTO {
  name: string;
  type: CategoryTypesEnum;
}
