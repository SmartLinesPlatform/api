import LineTypesEnum from "@enums/LineTypesEnum";

export default interface IUpdateLineDTO {
  id: string;
  store_id?: string;
  type?: LineTypesEnum;
}
