import ICoordinates from "@utils/interfaces/ICoordinates";
import PointInPolygon from 'robust-point-in-polygon';

export const isInsidePolygon = (point: ICoordinates, polygon: ICoordinates[]): Boolean => {
  const { lat, lng } = point;

  const polygonToArray = polygon.map(({ lat, lng }) => [lat, lng] as [number, number]);

  const inside = PointInPolygon(polygonToArray, [Number(lat), Number(lng)]);
  if (inside === 1) {
    return false;
  }

  return true;
}
