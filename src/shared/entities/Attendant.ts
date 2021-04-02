import { Collection } from "fireorm";

import IAttendant from "./interfaces/IAttendant";

@Collection()
export default class Attendant implements IAttendant {
  id: string;
  name: string;
  email: string;
  password: string;
  store_id: string;
  created_at: Date;
  updated_at: Date;
}
