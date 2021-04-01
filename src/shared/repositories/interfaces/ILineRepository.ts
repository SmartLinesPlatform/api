import ILine from "@entities/Line";
import LineTypesEnum from "@enums/LineTypesEnum";

export interface ICreateLineRequest {
  type: LineTypesEnum;
  orders: string[];
  store_id: string;
}

export interface IUpdateLineRequest {
  type?: LineTypesEnum;
  orders?: string[];
  store_id?: string;
}

export default interface ILineRepository {
  create(data: ICreateLineRequest): Promise<ILine>;
  update(id: string, data: IUpdateLineRequest): Promise<void>;
  delete(id: string): Promise<void>;
  listAll(): Promise<ILine[]>;
  findById(id: string): Promise<ILine>;
}
