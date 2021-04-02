import StoreTypesEnum from "@enums/StoreTypesEnum";
import { Collection } from "fireorm";

import IStore from "./interfaces/IStore";

@Collection()
export default class Store implements IStore {
  id: string;
  name: string;
  categories: string[];
  lines: string[];
  cnpj: string;
  attendants: string[];
  admins: string[];
  coordinates: { lat: number; lng: number };
  ads: string[];
  type: StoreTypesEnum;
  created_at: Date;
  updated_at: Date;
}
