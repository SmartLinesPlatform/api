import CategoryTypesEnum from "@enums/CategoryTypesEnum";

export default interface IUpdateCategoryDTO {
  id: string;
  name?: string;
  type?: CategoryTypesEnum;
}
