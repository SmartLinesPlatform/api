import ICoordinates from "@utils/interfaces/ICoordinates";

export default interface ICreateAreaDTO {
  name: string;
  bounds: ICoordinates[];
}
