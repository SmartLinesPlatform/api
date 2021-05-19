import AdsRepository from "@repositories/AdsRepository";
import IAdsRepository from "@repositories/interfaces/IAdsRepository";
import { container } from "tsyringe";

container.registerSingleton<IAdsRepository>("AdsRepository", AdsRepository);
