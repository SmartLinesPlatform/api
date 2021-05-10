import AttendantRepository from "@repositories/AttendantRepository";
import IAttendantRepository from "@repositories/interfaces/IAttendantRepository";
import { container } from "tsyringe";

container.registerSingleton<IAttendantRepository>(
  "AttendantRepository",
  AttendantRepository
);
