import ICoordinates from "@utils/interfaces/ICoordinates";

export default interface IArea {
  id: string;
  name: string;
  bounds: ICoordinates[];
}
