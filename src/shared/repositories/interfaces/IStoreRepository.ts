import IStore from "@entities/interfaces/IStore";
import StoreTypesEnum from "@enums/StoreTypesEnum";

export interface ICreateStoreRequest {
  area_id: string;
  name: string;
  cnpj: string;
  lat: number;
  lng: number;
  type: StoreTypesEnum;
  lines: {
    attendance_line_id: string;
    withdraw_line_id: string;
  };
  categories: string[];
}

export interface IUpdateStoreRequest {
  id: string;
  name?: string;
  cnpj?: string;
  lat?: number;
  lng?: number;
  type?: StoreTypesEnum;
  picture_url?: string;
}

export interface IUpdateLineInStoreRequest {
  id: string;
  lines: string[];
}

export interface IListAllStoresRequest {
  types: string[];
  area_id?: string;
}

export default interface IStoreRepository {
  create(data: ICreateStoreRequest): Promise<IStore>;
  update(data: IUpdateStoreRequest): Promise<void>;
  delete(id: string): Promise<void>;
  listAll(data: IListAllStoresRequest): Promise<IStore[]>;
  listPartnerStores(): Promise<IStore[]>;
  findById(id: string): Promise<IStore | null>;
  findByCnpj(cnpj: string): Promise<IStore | null>;
}
