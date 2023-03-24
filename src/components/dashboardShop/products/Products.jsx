import React, { useCallback, useState, useEffect } from "react";
import Swal from "sweetalert2";

import styles from "./Products.module.scss";
import Image from "next/image";
import { Button, Spinner } from "react-bootstrap";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { dataBase } from "@/libs/firebase-config";

function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const getProducts = useSelector(selectProducts);
  // const dispatch = useDispatch();
  // const us = useSelector(selectUsers);
  // console.log(us);

  console.log(data);

  const productData = useCallback(async () => {
    setLoading(true);

    const productItems = await getDocs(collection(dataBase, "products"));
    const result = productItems.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(result);
    setData(result);
    setLoading(false);
  }, []);

  useEffect(() => {
    productData();
  }, [productData]);

  const deleteProduct = async (e) => {
    // console.log(e.target.id);

    const deleteRef = doc(dataBase, "products", e.target.id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(deleteRef);

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        window.location.reload(true);
      }
    });
  };

  return (
    <main className={styles.productContainer}>
      {loading ? (
        <Spinner />
      ) : (
        data.map(({ id, imageSrc, productName, description }) => (
          <section
            className={`${styles.container} card d-flex flex-column`}
            key={id}
            id={id}
          >
            <article className="d-flex flex-row">
              {" "}
              <div className="col-4">
                <div className="col=12 card-img-top">
                  <Image width={100} height={100} src={imageSrc} alt="" />
                </div>
                <h2 className="card-title"> {productName} </h2>
              </div>
              <p className="card-text col-5"> {description} </p>
              <div className="col-2">
                <Button
                  id={id}
                  onClick={(e) => {
                    console.log(e.currentTarget.id);
                  }}
                >
                  {" "}
                  Edit{" "}
                </Button>
                <Button id={id} onClick={deleteProduct} className="btn-danger">
                  {" "}
                  Delete{" "}
                </Button>{" "}
              </div>
            </article>
          </section>
        ))
      )}
    </main>
  );
}

// my task Tomorrow, in sha Allah, is to edit and delete product from dashboard

export default Products;
