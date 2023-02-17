import React, { useState } from "react";
import Spinner from "@/components/spinner/Spinner";
import { BsCloudUploadFill } from "react-icons/bs";
import images from "@/export/images";
import { ref, storage } from "@/libs/firebase-config";

// Styles
import styles from "./Upload.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";

const initialState = {
  productName: "",
  category: "",
  imageSrc: "",
  price: 0,
};

function Upload() {
  const [uploadData, setUploadData] = useState(initialState);
  const [errors, setErrors] = useState({
    errorMessage: "",
    errorBolean: false,
  });
  const [loading, setLoading] = useState(false);
  const [productImage, setProductImage] = useState("");

  const handleChange = (e) => {
    setUploadData({ ...uploadData, [e.target.name]: e.target.value });
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

  const handleProductUpload = (e) => {
    e.preventDefault();

    console.log(uploadData);
  };

  return (
    <main
      className={`${styles.uploadContainer} d-flex flex-column align-items-center justify-content-center`}
    >
      <form
        data-aos-duration="2000"
        data-aos="zoom-out"
        className={` d-flex flex-column align-items-center justify-content-center col-12`}
      >
        <div data-aos="fade-left" className="col-8 mt-2">
          <label htmlFor="name"> Product Name</label>
          <input
            type="text"
            name="productName"
            defaultValue={initialState.productName}
            onChange={handleChange}
            placeholder="enter product name"
            className="form-control"
          />
        </div>
        <div data-aos="fade-right" className="col-8 mt-2">
          <label htmlFor="Category"> Category </label>
          <select
            name="category"
            className={`${styles.inputContainer} form-select`}
            value={uploadData.category}
            onChange={handleChange}
          >
            <option> Select Category </option>
            <option value="couch"> Couch </option>
            <option value="Office Chair"> Office Chair </option>
            <option value="Wooden Chair"> Wooden Chair </option>
          </select>
        </div>

        <div data-aos="fade-left" className="col-8 mt-2">
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
                  defaultValue={initialState.imageSrc}
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
          className="d-flex flex-row justify-content-between align-items-center col-8  mt-2"
        >
          <h4> Price: $ {uploadData.price}</h4>
          <div>
            <input
              type="text"
              name="price"
              defaultValue={initialState.price}
              onChange={handleChange}
              placeholder="enter product price"
              className="form-control"
            />
          </div>
        </div>

        <motion.div
          whileTap={{ scale: 1.1 }}
          data-aos="zoom-in"
          className="mt-5 mb-3 col-8"
        >
          <button onClick={handleProductUpload} className="main-btn col-12">
            {" "}
            Save{" "}
          </button>
        </motion.div>
      </form>
    </main>
  );
}

export default Upload;
