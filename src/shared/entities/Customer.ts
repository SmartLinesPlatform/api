import Category from "./Category";
import IEntity from "./interfaces/IEntity";

export default interface ICustomer extends IEntity {
  email: string;
  name: string;
  password: string;
  favorites_categories: Category[];
  is_in_line: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  profile_picture: string;
}
