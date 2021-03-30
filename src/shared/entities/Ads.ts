import IEntity from "./interfaces/IEntity";

export default interface IAds extends IEntity {
  open_date: Date;
  close_date: Date;
  thumbnail_url: string;
  store_id: string;
  post: {
    image: string;
    title: string;
    description: string;
  };
}
