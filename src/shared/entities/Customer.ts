import ICustomer from "./interfaces/ICustomer";

export default class Customer implements ICustomer {
  id: string;
  email: string;
  name: string;
  password: string;
  favorites_categories: string[];
  is_in_line: boolean;
  coordinates: { lat: number; lng: number };
  profile_picture: string;
  created_at: string;
  updated_at: string;
}
