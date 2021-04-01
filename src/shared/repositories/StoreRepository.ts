import chalk from "chalk";

import firebase from "../../config/firebase";
import IStore from "../entities/Store";
import IStoreRepository, {
  ICreateStoreRequest,
  IUpdateStoreRequest,
} from "./interfaces/IStoreRepository";

class StoreRepository implements IStoreRepository {
  private repository: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor() {
    this.repository = firebase.firestore().collection("stores");
  }

  async findById(id: string): Promise<IStore | undefined> {
    const storeData = await this.repository.doc(id).get();

    if (storeData.exists) {
      return undefined;
    }

    const store = { ...storeData.data(), id: storeData.id } as IStore;
    return store;
  }

  async findByCnpj(cnpj: string): Promise<IStore | undefined> {
    const storesData = await this.repository.where("cnpj", "==", cnpj).get();

    if (storesData.empty) {
      return undefined;
    }

    const firstStore = storesData.docs[0];

    const store = {
      ...firstStore.data(),
      id: firstStore.id,
    } as IStore;

    return store;
  }

  async create({
    name,
    cnpj,
    lat,
    lng,
    type,
    lines,
    categories,
  }: ICreateStoreRequest): Promise<IStore> {
    const storeRef = await this.repository.add({
      name,
      cnpj,
      coordinates: { lat, lng },
      type,
      lines,
      attendants: [],
      admins: [],
      ads: [],
      categories,
    });

    const storeData = await storeRef.get();

    const store = { ...storeData.data(), id: storeData.id } as IStore;
    return store;
  }

  async update(
    id: string,
    data: IUpdateStoreRequest
  ): Promise<IStore | undefined> {
    const storeRef = this.repository.doc(id);
    const storeData = await storeRef.get();

    if (storeData.exists) {
      return undefined;
    }

    await storeRef.update(data);
    return { ...storeData.data(), id: storeData.id } as IStore;
  }

  async delete(id: string): Promise<void> {
    const storeRef = this.repository.doc(id);
    await storeRef.delete();
  }

  async listAll(): Promise<IStore[]> {
    const storesData = await this.repository.get();
    const stores = storesData.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as IStore)
    );
    return stores;
  }
}

export default StoreRepository;
