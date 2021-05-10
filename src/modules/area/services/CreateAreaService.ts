import IArea from "@entities/interfaces/IArea";
import AppError from "@errors/AppError";
import IAreaRepository from "@repositories/interfaces/IAreaRepository";
import { isInsidePolygon } from "@utils/helpers/Location";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import ICreateAreaDTO from "../dtos/ICreateAreaDTO";

@injectable()
class CreateAreaService implements IService<IArea, ICreateAreaDTO> {
  private areaRepository: IAreaRepository;

  constructor(@inject("AreaRepository") areaRepository: IAreaRepository) {
    this.areaRepository = areaRepository;
  }

  public async execute({ name, bounds }: ICreateAreaDTO): Promise<IArea> {
    const areas = await this.areaRepository.listAll();

    areas.forEach((area) => {
      if (area.name === name) {
        throw new AppError("Already exists an Area with this name", 400);
      }

      bounds.forEach((point) => {
        const isInside = isInsidePolygon(point, area.bounds);

        if (isInside) {
          throw new AppError(
            "Already exists an Area covering these points",
            400
          );
        }
      });
    });

    const area = await this.areaRepository.create({ name, bounds });

    return area;
  }
}

export default container.resolve(CreateAreaService);
