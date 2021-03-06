import CategoryTypesEnum from "@enums/CategoryTypesEnum";
import { Collection } from "fireorm";

import ICategory from "./interfaces/ICategory";

@Collection()
export default class Category implements ICategory {
  id: string;
  type: CategoryTypesEnum;
  name: string;
  created_at: Date;
  updated_at: Date;
}
