import IStore from "@entities/interfaces/IStore";
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
  id: string;
  name?: string;
  cnpj?: string;
  lat?: number;
  lng?: number;
  type?: StoreTypesEnum;
}

export default interface IStoreRepository {
  create(data: ICreateStoreRequest): Promise<IStore>;
  update(data: IUpdateStoreRequest): Promise<void>;
  delete(id: string): Promise<void>;
  listAll(): Promise<IStore[]>;
  findById(id: string): Promise<IStore | null>;
  findByCnpj(cnpj: string): Promise<IStore | null>;
}
