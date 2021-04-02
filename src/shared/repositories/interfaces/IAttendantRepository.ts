import IAttendant from "@entities/Attendant";

export interface ICreateAttendantRequest {
  name: string;
  email: string;
  password: string;
  store_id: string;
}

export interface IUpdateAttendantRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  store_id?: string;
}

export default interface IAttendantRepository {
  create(data: ICreateAttendantRequest): Promise<IAttendant>;
  update(data: IUpdateAttendantRequest): Promise<void>;
  delete(id: string): Promise<void>;
  listAll(): Promise<IAttendant[]>;
  findById(id: string): Promise<IAttendant | null>;
}
