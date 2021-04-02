import StoreTypesEnum from "@enums/StoreTypesEnum";

export default interface ICreateStoreDTO {
  name: string;
  cnpj: string;
  lat: number;
  lng: number;
  type: StoreTypesEnum;
  categories: string[];
}
