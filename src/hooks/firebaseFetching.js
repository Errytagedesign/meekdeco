import { dataBase, ref, storage } from "@/libs/firebase-config";

import {
  collection,
  query,
  docs,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

export const getAllDatas = async () => {
  const productItems = await getDocs(collection(dataBase, "products"));

  return productItems.docs.map((doc) => doc.data());
};
