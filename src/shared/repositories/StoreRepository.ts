import firebase from "../../config/firebase";
import Store from "../entities/Store";
import IStoreRepository, {
  ICreateStoreRequest,
} from "./interfaces/IStoreRepository";

class StoreRepository implements IStoreRepository {
  private repository: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor() {
    this.repository = firebase.firestore().collection("stores");
  }
  async create({
    name,
    cnpj,
    lat,
    lng,
    type,
    lines,
  }: ICreateStoreRequest): Promise<Store> {
    const storeRef = await this.repository.add({
      name,
      cnpj,
      coordinates: { lat, lng },
      type,
      lines,
      attendants: [],
      admins: [],
      ads: [],
    });

    const storeData = await storeRef.get();

    const store = { ...storeData.data(), id: storeData.id } as Store;
    return store;
  }
  update(): void {
    throw new Error("Method not implemented.");
  }
  delete(): void {
    throw new Error("Method not implemented.");
  }
  async listAll(): Promise<Store[]> {
    const dataStores = await this.repository.get();
    const stores = dataStores.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Store)
    );
    return stores;
  }

  // async create({ name, age }: IUser): Promise<void> {
  //   await this.repository.add({
  //     name,
  //     age,
  //   });
  // }
}

export default StoreRepository;
