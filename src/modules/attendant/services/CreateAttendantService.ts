import IAttendant from "@entities/interfaces/IAttendant";
import LineTypesEnum from "@enums/LineTypesEnum";
import AppError from "@errors/AppError";
import IAreaRepository from "@repositories/interfaces/IAreaRepository";
import ICategoryRepository from "@repositories/interfaces/ICategoryRepository";
import ILineRepository from "@repositories/interfaces/ILineRepository";
import IAttendantRepository from "@repositories/interfaces/IAttendantRepository";
import IService from "@utils/interfaces/IService";
import { injectable, inject, container } from "tsyringe";

import ICreateAttendantDTO from "../dtos/ICreateAttendantDTO";
import IStoreRepository from "@repositories/interfaces/IStoreRepository";

@injectable()
class CreateAttendantService implements IService<IAttendant, ICreateAttendantDTO> {
  private attendantRepository: IAttendantRepository;
  private storeRepository: IStoreRepository;

  constructor(
    @inject("AttendantRepository") attendantRepository: IAttendantRepository,
    @inject("StoreRepository") storeRepository: IStoreRepository,
  ) {
    this.attendantRepository = attendantRepository;
    this.storeRepository = storeRepository;
  }

  public async execute({
    name,
    email,
    password,
    store_id
  }: ICreateAttendantDTO): Promise<IAttendant> {

    const store = await this.storeRepository.findById(store_id);

    if (!store) {
      throw new AppError("Store not found", 404);
    }

    const attendantExists = await this.attendantRepository.findByEmail(email);

    if (attendantExists) {
      throw new AppError("Attendant already exists", 400);
    }

    const attendant = await this.attendantRepository.create({
      name,
      email,
      password,
      store_id
    });

    store.attendants.push(attendant.id);

    await this.storeRepository.update(store);


    return attendant;
  }
}

export default container.resolve(CreateAttendantService);
