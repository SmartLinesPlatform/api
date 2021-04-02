export default interface IAds {
  id: string;
  open_date: Date;
  close_date: Date;
  thumbnail_url: string;
  store_id: string;
  post: {
    image: string;
    title: string;
    description: string;
  };
  created_at: Date;
  updated_at: Date;
}
