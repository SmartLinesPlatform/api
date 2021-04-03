import Ads from "@entities/Ads";
import IAds from "@entities/interfaces/IAds";
import { getRepository, IRepository } from "fireorm";

import IAdsRepository, {
  ICreateAdsRequest,
  IUpdateAdsRequest,
} from "./interfaces/IAdsRepository";

class AdsRepository implements IAdsRepository {
  private repository: IRepository<IAds>;

  constructor() {
    this.repository = getRepository(Ads);
  }

  async findById(id: string): Promise<IAds | null> {
    const ads = await this.repository.findById(id);

    return ads;
  }

  async create({
    store_id,
    open_date,
    close_date,
    thumbnail_url,
    post,
  }: ICreateAdsRequest): Promise<IAds> {
    const ads = await this.repository.create({
      store_id,
      open_date,
      close_date,
      thumbnail_url,
      post,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return ads;
  }

  async update(data: IUpdateAdsRequest): Promise<void> {
    const updatedData = { ...data, updated_at: new Date() }
    await this.repository.update(updatedData);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  async listAll(): Promise<IAds[]> {
    const ads = await this.repository.find();
    return ads;
  }
}

export default AdsRepository;
