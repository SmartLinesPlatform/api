import AdminTypesEnum from "@enums/AdminTypesEnum";
import { Collection } from "fireorm";

import IAdmin from "./interfaces/IAdmin";

@Collection()
export default class Admin implements IAdmin {
  id: string;
  name: string;
  email: string;
  password: string;
  type: AdminTypesEnum;
  store_id: string;
  created_at: Date;
  updated_at: Date;
}
