import ILine from "@entities/Line";
import LineTypesEnum from "@enums/LineTypesEnum";

export interface ICreateLineRequest {
  type: LineTypesEnum;
  store_id: string;
}

export interface IUpdateLineRequest {
  id: string;
  type?: LineTypesEnum;
  store_id?: string;
  orders?: string[];
}

export default interface ILineRepository {
  create(data: ICreateLineRequest): Promise<ILine>;
  update(data: IUpdateLineRequest): Promise<void>;
  delete(id: string): Promise<void>;
  listAll(): Promise<ILine[]>;
  findById(id: string): Promise<ILine | null>;
  findLineByOrderInside(id: string): Promise<ILine | null>;
}
