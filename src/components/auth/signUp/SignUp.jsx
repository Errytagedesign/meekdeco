import React, { useState, useEffect } from "react";
import styles from "./SignUp.module.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/firebase-config";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUp({ close }) {
  const [loginData, setLoginData] = useState(initialState);
  const [errors, setErrors] = useState({
    errorMessage: "",
    errorBolean: false,
  });
  const [passwordType, setPasswordType] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // toggle password views
  const togglePassword = (id) => {
    const passwordInput = document.getElementById(id);

    // setting the state value to either true or false base on id
    setPasswordType((prev) => ({ ...passwordType, [id]: !prev[id] }));

    if (passwordInput.type === "password") {
      return (passwordInput.type = "text");
    }
    passwordInput.type = "password";
  };

  // validating
  const validatePassword = () => {
    let isValid = true;

    if (loginData !== "") {
      if (loginData.password !== loginData.confirmPassword) {
        console.log(loginData.password);

        isValid = false;
        setErrors({ ...errors, errorBolean: true });
      }
    }
    return isValid;
  };

  //  Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ ...errors, errorBolean: false });
    console.log(loginData);

    if (validatePassword()) {
      createUserWithEmailAndPassword(auth, loginData.email, loginData.password)
        .then((res) => {
          const user = res.user;

          console.log(user);
        })
        .catch((e) => {
          setErrors({ ...errors, errorMessage: e.message });
          console.log(e.message);
        });
    }

    // setLoginData(initialState);
  };

  // anytime any of the input is active, the error will be set to false

  useEffect(() => {
    if (
      loginData.email !== "" ||
      loginData.password !== "" ||
      loginData.confirmPassword !== ""
    )
      setErrors({ errorBolean: false });
  }, [loginData.confirmPassword, loginData.email, loginData.password]);

  return (
    <div className={`${styles.popUpBox} d-flex flex-column`}>
      <main className={`${styles.box} d-flex flex-column`}>
        <div data-aos="fade-right" className={styles.close}>
          <h2 onClick={close}> X </h2>
        </div>
        <form
          data-aos="zoom-in"
          className={` d-flex flex-column align-items-center justify-content-center col-12`}
        >
          <div data-aos="fade-left" className="col-8">
            <label htmlFor="email"> Email</label>
            <input
              type="email"
              name="email"
              defaultValue={initialState.email}
              onChange={handleChange}
              placeholder="enter your email"
              className="form-control"
            />
          </div>
          <div data-aos="fade-right" className="col-8">
            <label htmlFor="password"> Password </label>
            <div className={styles.inputContainer}>
              <input
                id="pass"
                type="password"
                name="password"
                defaultValue={initialState.password}
                onChange={handleChange}
                placeholder="enter your password"
                className="form-control "
              />{" "}
              <div
                onClick={() => togglePassword("pass")}
                className={styles.icon}
              >
                {!passwordType["pass"] ? (
                  <BsFillEyeSlashFill />
                ) : (
                  <BsFillEyeFill />
                )}
              </div>
            </div>
          </div>

          <div data-aos="fade-right" className="col-8">
            <label htmlFor="confirm password">Confirm Password </label>
            <div className={styles.inputContainer}>
              <input
                id="confirmpass"
                type="password"
                name="confirmPassword"
                defaultValue={initialState.confirmPassword}
                onChange={handleChange}
                placeholder="retype password"
                className="form-control "
              />{" "}
              <div
                onClick={() => togglePassword("confirmpass")}
                className={styles.icon}
              >
                {!passwordType["confirmpass"] ? (
                  <BsFillEyeSlashFill />
                ) : (
                  <BsFillEyeFill />
                )}
              </div>
            </div>

            {errors.errorBolean ? (
              <small style={{ color: "red" }}>
                {" "}
                Alaye you need glasses? this your password nor match abeg.{" "}
              </small>
            ) : (
              <small style={{ color: "red" }}> {errors.errorMessage} </small>
            )}
          </div>

          <div data-aos="zoom-in" className="mt-5 mb-3">
            <button onClick={handleSubmit} className="btn-outline">
              {" "}
              Login{" "}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default SignUp;
