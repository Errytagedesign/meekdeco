import { allProducts } from "@/features/productSlice";
import { dataBase } from "@/libs/firebase-config";
import { collection, getDocs } from "firebase/firestore";

export async function getAllDatas() {
  const productItems = await getDocs(collection(dataBase, "products"));

  // const result = productItems.docs.map((doc) => doc.data());
  // console.log(result);

  return productItems.docs.map((doc) => doc.data());
}
