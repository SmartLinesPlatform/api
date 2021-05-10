import ICoordinates from "@utils/interfaces/ICoordinates";

export default interface IListStoresDTO {
  partners: boolean;
  restaurants: boolean;
  current_position: ICoordinates;
}
