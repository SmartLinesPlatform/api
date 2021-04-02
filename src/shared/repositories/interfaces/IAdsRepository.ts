import IAds from "@entities/Ads";

export interface ICreateAdsRequest {
  store_id: string;
  open_date: Date;
  close_date: Date;
  thumbnail_url: string;
  post: {
    image: string;
    title: string;
    description: string;
  };
}

export interface IUpdateAdsRequest {
  id: string;
  store_id?: string;
  open_date?: Date;
  close_date?: Date;
  thumbnail_url?: string;
}

export default interface IAdsRepository {
  create(data: ICreateAdsRequest): Promise<IAds>;
  update(data: IUpdateAdsRequest): Promise<void>;
  delete(id: string): Promise<void>;
  listAll(): Promise<IAds[]>;
  findById(id: string): Promise<IAds | null>;
}
