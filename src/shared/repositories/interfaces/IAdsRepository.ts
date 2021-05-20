import IAds from "@entities/Ads";

export interface ICreateAdsRequest {
  title: string;
  description: string;
  author_id: string;
  banner_url: string;
  store_id: string;
  isActive: boolean;
}

export interface IUpdateAdsRequest {
  id: string;
  store_id?: string;
  open_date?: Date;
  close_date?: Date;
  thumbnail_url?: string;
}

export interface IListAllAdsRequest {
  store_id?: string;
  all?: boolean;
}

export default interface IAdsRepository {
  create(data: ICreateAdsRequest): Promise<IAds>;
  update(data: IUpdateAdsRequest): Promise<void>;
  delete(id: string): Promise<void>;
  listAll(data: IListAllAdsRequest): Promise<IAds[]>;
  findById(id: string): Promise<IAds | null>;
}
