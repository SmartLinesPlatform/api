import ICoordinates from "@utils/interfaces/ICoordinates";
import { Collection } from "fireorm";

import IArea from "./interfaces/IArea";

@Collection()
export default class Area implements IArea {
  id: string;
  name: string;
  bounds: ICoordinates[];
}
