import React, { useState, useCallback, useEffect } from "react";
// import Spinner from "@/components/spinner/Spinner";
import { Spinner } from "react-bootstrap";
import { BsCloudUploadFill } from "react-icons/bs";
// import images from "@/export/images";
import { dataBase, ref, storage } from "@/libs/firebase-config";
import { motion } from "framer-motion";
import Image from "next/image";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useSweetAlert } from "@/hooks/useSweetAlert";

// Styles
import styles from "./Upload.module.scss";
import { useSelector } from "react-redux";
import { selectProducts } from "@/features/productSlice";

const initialState = {
  productName: "",
  category: "",
  imageSrc: "",
  price: 0,
  featured: false,
  description: "",
};

function Upload() {
  const [uploadData, setUploadData] = useState(initialState);
  // const [addinput, setAddInput] = useState([]);
  const [errors, setErrors] = useState({
    errorMessage: "",
    errorBolean: false,
  });
  const [loading, setLoading] = useState(false);
  const [productImage, setProductImage] = useState("");

  // const handAdd = () => {
  //   setAddInput((prev) => {
  //     console.log(prev);
  //     return [...prev, { id: prev.length + 1, value: "" }];
  //   });
  // };

  // Sweetalerts
  const { Toast } = useSweetAlert();

  const handleChange = (e) => {
    // This is how to target an attribute of a particular input among many inputa data while using onChange event "checked" is attribute of a chekbox input, so i get the event value when changing
    const { checked, name } = e.target;
    // console.log("checkit" + checked);

    // and then set all input value into this setState.
    setUploadData((prev) => {
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
          setUploadData({ ...uploadData, imageSrc: imageUrl });
          setLoading(false);
        });
      }
    );
  };

  // clear all imput file after saving
  const handleClearField = () => {
    setUploadData(initialState);
    setProductImage("");
  };

  // Upload products when all input fields are valid
  const handleProductUpload = async (e) => {
    e.preventDefault();
    console.log(uploadData);

    setLoading(true);

    try {
      if (
        uploadData.category === "" ||
        uploadData.price === "" ||
        uploadData.productName === "" ||
        // uploadData.imageSrc === "" ||
        uploadData.description === ""
      ) {
        setErrors({ ...errors, errorBolean: true });
        // setLoading(false);
      } else {
        await setDoc(doc(dataBase, "products", `${Date.now()}`), uploadData);
        setLoading(false);
        Toast.fire({
          icon: "success",
          title: "Product uploaded successfully 🥳🥰",
        });
        handleClearField();
      }
    } catch (e) {
      setLoading(false);
      setErrors({ ...errors, errorBolean: true });
      alert(e);
      console.log(e);
    }
  };

  // anytime any of the input is active, the error will be set to false

  useEffect(() => {
    if (
      uploadData.category !== "" ||
      uploadData.price !== "" ||
      uploadData.productName !== "" ||
      uploadData.imageSrc !== "" ||
      uploadData.description !== ""
    )
      setErrors({ errorBolean: false });
  }, [
    uploadData.category,
    uploadData.description,
    uploadData.imageSrc,
    uploadData.price,
    uploadData.productName,
  ]);

  return (
    <main
      className={`${styles.uploadContainer} d-flex flex-column align-items-center justify-content-center`}
    >
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
            value={uploadData.productName}
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
            value={uploadData.category}
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
            {productImage ? (
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
              </div>
            ) : loading ? (
              <Spinner />
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center p-5">
                <BsCloudUploadFill fontSize={30} />
                <small> Upload Images </small>

                {/* Product Image */}
                <input
                  id="ProductImage"
                  type="file"
                  accept="image/*"
                  name="imageSrc"
                  value={uploadData.imageSrc}
                  onChange={handleUploadImage}
                  className={styles.uploadInp}
                />
              </div>
            )}

            {errors.errorMessage && <small> {errors.errorMessage} </small>}
          </label>
        </div>

        <div
          data-aos="fade-left"
          className="d-flex flex-row justify-content-between align-items-center col-10  mt-1"
        >
          <div className="col-8 d-flex flex-row align-items-center">
            <h5 className="col-6"> Price: ₦ {uploadData.price}</h5>
            <div className="col-5">
              <input
                type="number"
                name="price"
                value={uploadData.price}
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
              value={uploadData.featured}
              checked={uploadData.featured || false}
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
            value={uploadData.description}
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
          <button onClick={handleProductUpload} className="main-btn col-12">
            {loading ? <Spinner /> : "Save"}
          </button>
        </motion.div>

        {errors.errorBolean && (
          <h3 style={{ color: "red" }}> All field must filled </h3>
        )}
      </form>

      {/* <button className="main-btn" onClick={handAdd}>
        {" "}
        Add{" "}
      </button>

      {addinput &&
        addinput.map((inp, key) => {
          console.log("re-rendered", key);

          return (
            <div key={key}>
              <input
                placeholder="enter product name"
                className="form-control"
                key={inp.key}
                value={inp.value}
              />
            </div>
          );
        })} */}
    </main>
  );
}

export default Upload;
