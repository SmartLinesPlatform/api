import ICoordinates from "@utils/interfaces/ICoordinates";

export default interface ICustomer {
  id: string;
  email: string;
  name: string;
  password: string;
  favorites_categories: string[];
  is_in_line: boolean;
  coordinates: ICoordinates;
  profile_picture: string | null;
  created_at: Date;
  updated_at: Date;
}
