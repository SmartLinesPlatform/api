import ICustomer from "@entities/interfaces/ICustomer";

export interface ICreateCustomerRequest {
  name: string;
  email: string;
  password: string;
}

export interface IUpdateCustomerRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

export default interface ICustomerRepository {
  create(data: ICreateCustomerRequest): Promise<ICustomer>;
  update(data: IUpdateCustomerRequest): Promise<void>;
  delete(id: string): Promise<void>;
  listAll(): Promise<ICustomer[]>;
  findById(id: string): Promise<ICustomer | null>;
  findByEmail(email: string): Promise<ICustomer | null>;
}
