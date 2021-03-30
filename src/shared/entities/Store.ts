import StoreTypesEnum from "../enums/StoreTypesEnum";
import Admin from "./Admin";
import Ads from "./Ads";
import Attendant from "./Attendant";
import Category from "./Category";
import IEntity from "./interfaces/IEntity";
import Line from "./Line";

export default interface IStore extends IEntity {
  name: string;
  categories: Category[];
  lines: Line[];
  cnpj: string;
  attendants: Attendant[];
  admins: Admin[];
  coordinates: {
    lat: number;
    lng: number;
  };
  ads: Ads[];
  type: StoreTypesEnum;
}
