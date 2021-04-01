import IStore from "@entities/Store";
import StoreTypesEnum from "@enums/StoreTypesEnum";

export interface ICreateStoreRequest {
  name: string;
  cnpj: string;
  lat: number;
  lng: number;
  type: StoreTypesEnum;
  lines: string[];
  categories: string[];
}

export interface IUpdateStoreRequest {
  name?: string;
  cnpj?: string;
  lat?: number;
  lng?: number;
  type?: StoreTypesEnum;
}

export default interface IStoreRepository {
  create(data: ICreateStoreRequest): Promise<IStore>;
  update(id: string, data: IUpdateStoreRequest): Promise<IStore | undefined>;
  delete(id: string): Promise<void>;
  listAll(): Promise<IStore[]>;
  findById(id: string): Promise<IStore | undefined>;
  findByCnpj(cnpj: string): Promise<IStore | undefined>;
}
