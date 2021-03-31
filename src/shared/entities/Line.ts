import LineTypesEnum from "@enums/LineTypesEnum";

import IEntity from "./interfaces/IEntity";

export default interface ILine extends IEntity {
  store_id: string;
  type: LineTypesEnum;
  orders: string[];
}
