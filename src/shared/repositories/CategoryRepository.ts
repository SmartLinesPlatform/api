import ICategory from "@entities/Category";

import firebase from "../../config/firebase";
import ICategoryRepository, {
  ICreateCategoryRequest,
  IUpdateCategoryRequest,
} from "./interfaces/ICategoryRepository";

class CategoryRepository implements ICategoryRepository {
  private repository: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor() {
    this.repository = firebase.firestore().collection("categories");
  }

  async findById(id: string): Promise<ICategory | undefined> {
    const categoryData = await this.repository.doc(id).get();

    if (!categoryData.exists) {
      return undefined;
    }

    const category = {
      ...categoryData.data(),
      id: categoryData.id,
    } as ICategory;

    return category;
  }

  async create({ name, type }: ICreateCategoryRequest): Promise<ICategory> {
    const categoryRef = await this.repository.add({
      name,
      type,
    });

    const categoryData = await categoryRef.get();

    const category = {
      ...categoryData.data(),
      id: categoryData.id,
    } as ICategory;

    return category;
  }

  async update(id: string, data: IUpdateCategoryRequest): Promise<boolean> {
    const categoryRef = this.repository.doc(id);

    const categoryData = await categoryRef.get();

    if (!categoryData.exists) {
      return false;
    }

    await categoryRef.update(data);
    return true;
  }
  async delete(id: string): Promise<boolean> {
    const categoryRef = this.repository.doc(id);
    const categoryData = await categoryRef.get();

    if (!categoryData.exists) {
      return false;
    }
    await categoryRef.delete();
    return true;
  }
  async listAll(): Promise<ICategory[]> {
    const categoriesData = await this.repository.get();
    const categories = categoriesData.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as ICategory)
    );
    return categories;
  }
}

export default CategoryRepository;
