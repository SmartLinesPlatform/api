import AdminTypesEnum from "@enums/AdminTypesEnum";

export default interface IAdmin {
  id: string;
  name: string;
  email: string;
  password: string;
  type: AdminTypesEnum;
  store_id: string;
  created_at: Date;
  updated_at: Date;
}
