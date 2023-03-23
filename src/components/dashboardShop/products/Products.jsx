import React from "react";

import styles from "./Products.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { increaMent, selectProducts } from "@/features/productSlice";
import { Button } from "react-bootstrap";
import { selectUsers } from "@/features/loginSlice";

function Products() {
  const getProducts = useSelector(selectProducts);
  const dispatch = useDispatch();
  const us = useSelector(selectUsers);
  console.log(us);

  console.log(getProducts);
  return (
    <main className={styles.productContainer}>
      {/* {products.data.map(({ id, imageSrc, productName }) => (
        <section className={`${styles.container} d-flex flex-column`} key={id}>
          <div className="col=12">
            <Image width={100} height={100} src={imageSrc} alt="" />
          </div>
          <h2> {productName} </h2>
        </section>
      ))} */}

      <Button
        onClick={() => {
          dispatch(increaMent());
        }}
      >
        {" "}
        add{" "}
      </Button>
    </main>
  );
}

// my task Tomorrow, in sha Allah, is to edit and delete product from dashboard

export default Products;
