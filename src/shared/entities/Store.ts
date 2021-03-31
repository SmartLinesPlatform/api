import StoreTypesEnum from "@enums/StoreTypesEnum";

import IEntity from "./interfaces/IEntity";

export default interface IStore extends IEntity {
  name: string;
  categories: string[];
  lines: string[];
  cnpj: string;
  attendants: string[];
  admins: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  ads: string[];
  type: StoreTypesEnum;
}
