import LineTypesEnum from "@enums/LineTypesEnum";
import { Collection } from "fireorm";

import ILine from "./interfaces/ILine";

@Collection()
export default class Line implements ILine {
  id: string;
  store_id: string;
  type: LineTypesEnum;
  orders: string[];
  created_at: Date;
  updated_at: Date;
}
