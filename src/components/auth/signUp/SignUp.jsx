import React, { useState } from "react";
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
  const [error, setError] = useState(false);
  const [passwordType, setPasswordType] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const togglePassword = (id) => {
    const passwordInput = document.getElementById(id);

    setPasswordType((prev) => ({ [id]: !prev[id] }));
    if (passwordInput.type === "password") {
      return (passwordInput.type = "text");
    }
    passwordInput.type = "password";
  };

  // const validatePassword =() => {
  //   let isValid  = true

  //   if (loginData !==  '') {
  //     if(loginData.password !== )
  //   }
  // }

  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((res) => {
        const user = res.user;

        console.log(user);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

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
                name="confirm password"
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

            {error && (
              <small style={{ color: "red" }}>
                {" "}
                Alaye you need glasses? this your password nor match abeg.{" "}
              </small>
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
