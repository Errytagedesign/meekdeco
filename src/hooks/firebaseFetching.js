import { dataBase } from "@/libs/firebase-config";

import { collection, getDocs } from "firebase/firestore";

export const getAllDatas = async () => {
  const productItems = await getDocs(collection(dataBase, "products"));

  return productItems.docs.map((doc) => doc.data());
};
