import StoreTypesEnum from "@enums/StoreTypesEnum";
import ICoordinates from "@utils/interfaces/ICoordinates";

export default interface IStore {
  area_id: string;
  id: string;
  name: string;
  picture_url: string | undefined;
  categories: string[];
  lines: string[];
  cnpj: string;
  attendants: string[];
  admins: string[];
  coordinates: ICoordinates;
  ads: string[];
  type: StoreTypesEnum;
  created_at: Date;
  updated_at: Date;
}
