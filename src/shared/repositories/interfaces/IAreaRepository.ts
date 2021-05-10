import IArea from "@entities/Area";
import ICoordinates from "@utils/interfaces/ICoordinates";

export interface ICreateAreaRequest {
  name: string;
  bounds: ICoordinates[];
}

export interface IUpdateAreaRequest {
  id: string;
  name?: string;
  bounds?: ICoordinates[];
}

export default interface IAreaRepository {
  create(data: ICreateAreaRequest): Promise<IArea>;
  update(data: IUpdateAreaRequest): Promise<void>;
  delete(id: string): Promise<void>;
  listAll(): Promise<IArea[]>;
  findById(id: string): Promise<IArea | null>;
}
