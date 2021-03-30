import AdminTypesEnum from "../enums/AdminTypesEnum";
import IEntity from "./interfaces/IEntity";

export default interface IAdmin extends IEntity {
  name: string;
  email: string;
  password: string;
  type: AdminTypesEnum;
  store_id: string;
}
