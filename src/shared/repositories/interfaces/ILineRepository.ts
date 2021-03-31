import ILine from "@entities/Line";
import LineTypesEnum from "@enums/LineTypesEnum";

export interface ICreateLineRequest {
  type: LineTypesEnum;
  orders: string[];
  store_id: string;
}

export interface IUpdateLineRequest {
  id: string;
  type?: LineTypesEnum;
  orders?: string[];
  store_id?: string;
}

export default interface ILineRepository {
  create(data: ICreateLineRequest): Promise<ILine>;
  update(data: IUpdateLineRequest): Promise<void>;
  delete(): Promise<void>;
  listAll(): Promise<ILine[]>;
}
