import LineTypesEnum from "@enums/LineTypesEnum";

export default interface ILine {
  id: string;
  store_id: string;
  type: LineTypesEnum;
  orders: string[];
  created_at: Date;
  updated_at: Date;
}
