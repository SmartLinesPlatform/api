import ILine from "@entities/Line";

import firebase from "../../config/firebase";
import ILineRepository, {
  ICreateLineRequest,
  IUpdateLineRequest,
} from "./interfaces/ILineRepository";

class LineRepository implements ILineRepository {
  private repository: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor() {
    this.repository = firebase.firestore().collection("lines");
  }

  async findById(id: string): Promise<ILine> {
    const lineData = await this.repository.doc(id).get();
    const line = { ...lineData.data(), id: lineData.id } as ILine;
    return line;
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
  async update(id: string, data: IUpdateLineRequest): Promise<void> {
    const lineRef = this.repository.doc(id);
    await lineRef.update(data);
  }
  async delete(id: string): Promise<void> {
    const lineRef = this.repository.doc(id);
    await lineRef.delete();
  }
  async listAll(): Promise<ILine[]> {
    const linesData = await this.repository.get();
    const lines = linesData.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as ILine)
    );
    return lines;
  }
}

export default LineRepository;
