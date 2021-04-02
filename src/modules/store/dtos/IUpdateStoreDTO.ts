import StoreTypesEnum from "@enums/StoreTypesEnum";

export default interface IUpdateStoreDTO {
  id: string;
  name: string;
  cnpj: string;
  lat: number;
  lng: number;
  type: StoreTypesEnum;
}
