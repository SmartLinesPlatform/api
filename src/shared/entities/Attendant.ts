import IEntity from "./interfaces/IEntity";

export default interface IAttendant extends IEntity {
  name: string;
  email: string;
  password: string;
  store_id: string;
}
