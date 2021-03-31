import ILine from "@entities/Line";

import firebase from "../../config/firebase";
import ILineRepository, {
  ICreateLineRequest,
  IUpdateLineRequest,
} from "./interfaces/ILineRepository";

class StoreRepository implements ILineRepository {
  private repository: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor() {
    this.repository = firebase.firestore().collection("lines");
  }
  async create({ store_id, orders, type }: ICreateLineRequest): Promise<ILine> {
    const lineRef = await this.repository.add({
      store_id,
      orders,
      type,
    });

    const lineData = await lineRef.get();

    const line = { ...lineData.data(), id: lineData.id } as ILine;
    return line;
  }
  async update({
    id,
    orders,
    type,
    store_id,
  }: IUpdateLineRequest): Promise<void> {
    const fieldsToUpdate = {} as Omit<IUpdateLineRequest, "id">;

    if (orders) {
      fieldsToUpdate.orders = orders;
    }

    if (type) {
      fieldsToUpdate.type = type;
    }

    if (store_id) {
      fieldsToUpdate.store_id = store_id;
    }

    const lineRef = this.repository.doc(id);
    const updatedLine = await lineRef.update(fieldsToUpdate);
    console.log(updatedLine);
  }
  async delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async listAll(): Promise<ILine[]> {
    const dataLines = await this.repository.get();
    const lines = dataLines.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as ILine)
    );
    return lines;
  }
}

export default StoreRepository;
