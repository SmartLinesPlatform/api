import IAdmin from "@entities/Admin";
import AdminTypesEnum from "@enums/AdminTypesEnum";

export interface ICreateAdminRequest {
  name: string;
  email: string;
  password: string;
  type: AdminTypesEnum;
  store_id: string;
}

export interface IUpdateAdminRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  type?: AdminTypesEnum;
  store_id?: string;
}

export default interface IAdminRepository {
  create(data: ICreateAdminRequest): Promise<IAdmin>;
  update(data: IUpdateAdminRequest): Promise<void>;
  delete(id: string): Promise<void>;
  listAll(): Promise<IAdmin[]>;
  findById(id: string): Promise<IAdmin | null>;
}
