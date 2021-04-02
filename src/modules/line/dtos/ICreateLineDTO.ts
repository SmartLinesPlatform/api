import LineTypesEnum from "@enums/LineTypesEnum";

export default interface ICreateLineDTO {
  store_id: string;
  type: LineTypesEnum;
}
