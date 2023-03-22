import React from "react";

import styles from "./Products.module.scss";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectProducts } from "@/features/productSlice";

function Products() {
  const products = useSelector(selectProducts);

  console.log(products);
  return (
    <main className={styles.products}>
      {products.data.map(({ id, imageSrc, productName }) => (
        <section className={`${styles.container} d-flex flex-column`} key={id}>
          <div className="col=12">
            <Image width={100} height={100} src={imageSrc} alt="" />
          </div>
          <h2> {productName} </h2>
        </section>
      ))}
    </main>
  );
}

// my task Tomorrow, in sha Allah, is to edit and delete product from dashboard

export default Products;
