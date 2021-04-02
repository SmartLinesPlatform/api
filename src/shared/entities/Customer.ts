import { Collection } from "fireorm";

import ICustomer from "./interfaces/ICustomer";

@Collection()
export default class Customer implements ICustomer {
  id: string;
  email: string;
  name: string;
  password: string;
  favorites_categories: string[];
  is_in_line: boolean;
  coordinates: { lat: number; lng: number };
  profile_picture: string | null;
  created_at: Date;
  updated_at: Date;
}
