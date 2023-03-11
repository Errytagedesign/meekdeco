import React, { useEffect, useState, useMemo } from "react";
import { dataBase, ref, storage } from "@/libs/firebase-config";

import {
  collection,
  query,
  docs,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

import styles from "./Products.module.scss";
import Image from "next/image";

function Products() {
  const [products, setProducts] = useState();

  // let nowdata = [];

  // const getAllDatas = async () => {
  //   const querySnapshot = await getDocs(collection(dataBase, "products"));

  //   return querySnapshot.docs.map((doc) => doc.data());
  // };

  // const fetchDatas = async () => {
  //   await getAllDatas().then((res) => {
  //     console.log(res);
  //     setProducts(res);
  //   });
  // };

  // useEffect(() => {
  //   fetchDatas();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const loadData = useMemo(() => Datas(), []);

  // console.log(products);

  return (
    <main className={styles.products}>
      {products?.map((item) => (
        <section
          className={`${styles.container} d-flex flex-column`}
          key={item.id}
        >
          <div className="col=12">
            <Image width={100} height={100} src={item.imageSrc} alt="" />
          </div>
          <h2> {item.productName} </h2>
        </section>
      ))}
    </main>
  );
}

export default Products;
