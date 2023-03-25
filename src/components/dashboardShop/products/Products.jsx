import React, { useCallback, useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

import styles from "./Products.module.scss";
import Image from "next/image";
import { Button, Spinner } from "react-bootstrap";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { BsCloudUploadFill, BsTrash } from "react-icons/bs";
import { dataBase, ref, storage } from "@/libs/firebase-config";
import {
  deleteObject,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { useSweetAlert } from "@/hooks/useSweetAlert";

function Products() {
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [productImage, setProductImage] = useState("");
  const [errors, setErrors] = useState({
    errorMessage: "",
    errorBolean: false,
  });

  const { Toast } = useSweetAlert();

  // const getProducts = useSelector(selectProducts);
  // const dispatch = useDispatch();
  // const us = useSelector(selectUsers);
  // console.log(us);

  // console.log(data);

  const productEditId = useRef();

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

  const handleEdit = (e) => {
    // Use array.find method to check if the id of the clicked product matches the id of the data from database

    setShow(!show);
    const editId = e.target.id;
    let findId = data.find((el) => el.id === editId);

    setUpdateData(findId);
    setProductImage(findId.imageSrc);
    productEditId.current = editId;
    console.log(productEditId);
  };

  const handleUploadImage = (e) => {
    // console.log(e.target.files[0]);
    const ImageFile = e.target.files[0];

    // Image upload refrence, the current date and file name will be used as reference
    const uploadProductImage = ref(
      storage,
      `Images/${Date.now()}-${ImageFile.name}`
    );

    setLoading(true);

    const uploadTask = uploadBytesResumable(uploadProductImage, ImageFile);

    uploadTask.on(
      "state_change",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log("upload is" + uploadProgress + "% done");
      },
      (e) => {
        console.log(e);
        setErrors({ ...errors, errorMessage: e.message });
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((imageUrl) => {
          setProductImage(imageUrl);
          setUpdateData({ ...updateData, imageSrc: imageUrl });
          setLoading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    // This is how to target an attribute of a particular input among many inputa data while using onChange event "checked" is attribute of a chekbox input, so i get the event value when changing
    const { checked, name } = e.target;
    // console.log("checkit" + checked);

    // and then set all input value into this setState.
    setUpdateData((prev) => {
      if (name === "featured") {
        return {
          ...prev,
          featured: checked,
        };
      } else {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      }
    });
    // setUploadData({
    //   ...uploadData,
    //   [e.target.name]: e.target.value,
    //   featured: checked,
    // });
  };

  // deleteProductImage
  const deleteProductImage = () => {
    console.log(productImage);
    const deleteImage = ref(storage, productImage);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this! and Make sure to upload replacment images",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteObject(deleteImage);
        setUpdateData({ ...updateData, imageSrc: "" });
        setProductImage("");

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });

    // deleteObject(deleteImage)
    //   .then(() => {
    //     setUpdateData({ ...updateData, imageSrc: "" });
    //     setProductImage("");
    //     Toast.fire({
    //       icon: "success",
    //       title: "Image deleted successfully.🗑🚮",
    //     });
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  // clear all imput file after saving
  const handleClearField = () => {
    setUploadData(initialState);
    setProductImage("");
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    // console.log(productEditId.current);
    const productToUpdate = doc(dataBase, "products", productEditId.current);

    console.log(updateData);

    updateDoc(productToUpdate, updateData)
      .then(() => {
        setShow(false);
        Toast.fire({
          icon: "success",
          title: "Product uploaded successfully 🥳🥰",
        });

        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
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
                <Button id={id} onClick={handleEdit}>
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

      {show && (
        <form
          data-aos-duration="2000"
          data-aos="zoom-out"
          className={` d-flex flex-column align-items-center justify-content-center col-12`}
        >
          <div data-aos="fade-left" className="col-10 mt-1">
            <label htmlFor="name"> Product Name</label>
            <input
              type="text"
              name="productName"
              value={updateData.productName}
              onChange={handleChange}
              placeholder="Enter product name"
              className="form-control"
            />
          </div>
          <div data-aos="fade-right" className="col-10 mt-1">
            <label htmlFor="Category"> Category </label>
            <select
              name="category"
              className={`${styles.inputContainer} form-select`}
              value={updateData.category}
              onChange={handleChange}
            >
              <option> Select Category </option>
              <option value="couch"> Stool </option>
              <option value="couch"> Table </option>
              <option value="Office Chair"> Single Sofa </option>
              <option value="Office Chair"> Office Chair </option>
              <option value="Wooden Chair"> Wooden Sofa </option>
            </select>
          </div>

          <div data-aos="fade-left" className="col-10 mt-1">
            <label
              htmlFor="ProductImage"
              className={`${styles.upload}  col-12  `}
            >
              {loading ? (
                <Spinner />
              ) : (
                <>
                  {!productImage ? (
                    <div className="d-flex flex-column justify-content-center align-items-center p-5">
                      <BsCloudUploadFill fontSize={30} />
                      <small> Upload Images </small>

                      {/* Product Image */}
                      <input
                        id="ProductImage"
                        type="file"
                        accept="image/*"
                        name="imageSrc"
                        value={updateData.imageSrc}
                        onChange={handleUploadImage}
                        className={styles.uploadInp}
                      />
                    </div>
                  ) : (
                    <div
                      className={`${styles.imgPreview} col-12 d-flex justify-content-center`}
                    >
                      <Image
                        // className="col-12"

                        width={100}
                        height={100}
                        // objectFit="cover"
                        src={productImage}
                        alt=""
                      />
                      <motion.div
                        whileTap={{ scale: 1.4 }}
                        data-aos="zoom-in"
                        className={styles.delete}
                        onClick={deleteProductImage}
                      >
                        <BsTrash
                          size={38}
                          color="white"
                          className={styles.deleteIcon}
                        />
                      </motion.div>
                    </div>
                  )}
                </>
              )}

              {errors.errorMessage && <small> {errors.errorMessage} </small>}
            </label>
          </div>

          <div
            data-aos="fade-left"
            className="d-flex flex-row justify-content-between align-items-center col-10  mt-1"
          >
            <div className="col-8 d-flex flex-row align-items-center">
              <h5 className="col-6"> Price: ₦ {updateData.price}</h5>
              <div className="col-5">
                <input
                  type="number"
                  name="price"
                  value={updateData.price}
                  onChange={handleChange}
                  placeholder="enter product price"
                  className="form-control"
                />
              </div>
            </div>

            <div
              style={{
                backgroundColor: "var(--pryColor)",
                color: "white",
                borderRadius: "5px",
              }}
              className="d-flex flex-row align-items-center p-2 "
            >
              <small className="me-2"> Featured </small>
              <input
                name="featured"
                type="checkbox"
                value={updateData.featured}
                checked={data.featured || false}
                onChange={handleChange}
                // placeholder="enter product price"
                // className="form-control"
              />
            </div>
          </div>
          <div data-aos="fade-left" className="align-items-center col-10  mt-1">
            <label htmlFor="description"> Description </label>

            <textarea
              name="description"
              value={updateData.description}
              placeholder="Enter product description"
              className="form-control"
              rows="5"
              cols="20"
              onChange={handleChange}
            />
          </div>
          <motion.div
            whileTap={{ scale: 1.1 }}
            data-aos="zoom-in"
            className="mt-3 mb-3 col-10"
          >
            <button onClick={handleUpdateProduct} className="main-btn col-12">
              {loading ? <Spinner /> : "Save"}
            </button>
          </motion.div>

          {errors.errorBolean && (
            <h3 style={{ color: "red" }}> All field must filled </h3>
          )}
        </form>
      )}
    </main>
  );
}

// my task Tomorrow, in sha Allah, is to edit and delete product from dashboard

export default Products;
