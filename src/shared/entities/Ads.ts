import { Collection } from "fireorm";

import IAds from "./interfaces/IAds";

@Collection()
export default class Ads implements IAds {
  id: string;
  title: string;
  banner_url: string;
  author_id: string;
  description: string;
  store_id: string;
  isActive: boolean;
  created_at: Date;
  updated_at: Date;
}
