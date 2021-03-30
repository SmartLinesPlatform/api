import LineTypesEnum from "../enums/LineTypesEnum";
import IEntity from "./interfaces/IEntity";
import Order from "./Order";

export default interface ILine extends IEntity {
  store_id: string;
  type: LineTypesEnum;
  orders: Order[];
}
