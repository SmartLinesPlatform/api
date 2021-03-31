import ILine from "@entities/Line";
import Store from "@entities/Store";
import StoreTypesEnum from "@enums/StoreTypesEnum";

export interface ICreateStoreRequest {
  name: string;
  cnpj: string;
  lat: number;
  lng: number;
  type: StoreTypesEnum;
  lines: string[];
}

export default interface IStoreRepository {
  create(data: ICreateStoreRequest): Promise<Store>;
  update(): void;
  delete(): void;
  listAll(): Promise<Store[]>;
}
