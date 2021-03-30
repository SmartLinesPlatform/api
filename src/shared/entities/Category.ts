import CategoryTypesEnum from "@enums/CategoryTypesEnum";

import IEntity from "./interfaces/IEntity";

export default interface ICategory extends IEntity {
  type: CategoryTypesEnum;
  name: string;
}
