import StoreTypesEnum from "@enums/StoreTypesEnum";

export default interface ICreateStoreDTO {
  area_id: string;
  name: string;
  cnpj: string;
  lat: number;
  lng: number;
  type: StoreTypesEnum;
  categories: string[];
}
