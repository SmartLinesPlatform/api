export default interface ICreateAdsDTO {
  store_id: string;
  title: string;
  description: string;
  file: Express.Multer.File;
}
