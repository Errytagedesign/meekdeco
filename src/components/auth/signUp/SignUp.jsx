import React, { useState, useEffect } from "react";
import styles from "./SignUp.module.scss";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "@/libs/firebase-config";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { selectUsers, login, logout } from "@/features/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSweetAlert } from "@/hooks/useSweetAlert";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUp({ close }) {
  // states
  const [signUpData, setSignUpData] = useState(initialState);
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({
    errorMessage: "",
    errorBolean: false,
  });

  const [userSignUP, setUserSignUP] = useState(false);
  const [passwordType, setPasswordType] = useState(false);

  // Redux
  const dispatch = useDispatch();

  // Sweetalerts
  const { Toast } = useSweetAlert();

  const handleChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleChangeUserSignIn = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  // console.log(profilePic);

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

    if (signUpData !== "") {
      if (signUpData.password !== signUpData.confirmPassword) {
        console.log(signUpData.password);

        isValid = false;
        setErrors({ ...errors, errorBolean: true });
      }
    }
    return isValid;
  };

  //  Sign Up
  const handleSignUp = (e) => {
    e.preventDefault();
    setErrors({ ...errors, errorBolean: false });
    console.log(signUpData);

    if (validatePassword()) {
      createUserWithEmailAndPassword(
        auth,
        signUpData.email,
        signUpData.password
      )
        .then((res) => {
          const userData = res.user;

          console.log(userData);

          updateProfile(userData, {
            displayName: signUpData.firstName,
          })
            // Persisting the signup data into redux state
            .then(() => {
              dispatch(
                login({
                  email: userData.email,
                  uid: userData.uid,
                  displayName: signUpData.firstName,
                })
              );
            })
            .catch((e) => {
              console.log(e.message);
            });

          Toast.fire({
            icon: "success",
            title: "Welcome onboard Ejemi  👊🏿👏🏿",
          });
        })
        .catch((e) => {
          setErrors({ ...errors, errorMessage: e.message });
          console.log(e.message);
        });
    }

    // setsignUpData(initialState);
  };

  // Login
  const handleSigin = (e) => {
    e.preventDefault();
    // const refresh = () => window.location.reload(true);

    signInWithEmailAndPassword(auth, signInData.email, signInData.password)
      .then((res) => {
        const userData = res.user;
        console.log(userData);
        // setProfilePic(userData.displayName);
        dispatch(
          login({
            email: userData.email,
            uid: userData.uid,
            displayName: userData.displayName,
          })
        );

        // refresh();
        Toast.fire({
          icon: "success",
          title: "Welcome back Oga'wa  👊🏿👏🏿",
        });
      })
      .catch((e) => {
        setErrors({ ...errors, errorMessage: e.message });
      });
  };

  // anytime any of the input is active, the error will be set to false

  useEffect(() => {
    if (
      signUpData.email !== "" ||
      signUpData.password !== "" ||
      signUpData.confirmPassword !== "" ||
      signInData.password !== "" ||
      signInData.email !== ""
    )
      setErrors({ errorBolean: false });
  }, [
    signInData.email,
    signInData.password,
    signUpData.confirmPassword,
    signUpData.email,
    signUpData.password,
  ]);

  return (
    <div className={`${styles.popUpBox}  d-flex flex-column`}>
      <main className={`${styles.box} d-flex flex-column`}>
        <div data-aos="fade-right" className={styles.close}>
          <h2 onClick={close}> X </h2>
        </div>

        {userSignUP ? (
          <form
            data-aos="zoom-in"
            data-aos-duration="2000"
            className={` d-flex flex-column align-items-center justify-content-center col-12`}
          >
            <div data-aos="fade-left" className="col-8">
              <label htmlFor="firstName"> First Name</label>
              <input
                type="text"
                name="firstName"
                defaultValue={initialState.firstName}
                onChange={handleChange}
                placeholder="enter your first name"
                className="form-control"
              />
            </div>
            <div data-aos="fade-left" className="col-8">
              <label htmlFor="last name"> Last Name</label>
              <input
                type="text"
                name="lastName"
                defaultValue={initialState.lastName}
                onChange={handleChange}
                placeholder="enter your last name"
                className="form-control"
              />
            </div>

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

            <div data-aos="zoom-in" className="mt-5 mb-3 col-8">
              <button onClick={handleSignUp} className="main-btn col-12">
                {" "}
                Sign up{" "}
              </button>
            </div>
          </form>
        ) : (
          <form
            data-aos-duration="2000"
            data-aos="zoom-out"
            className={` d-flex flex-column align-items-center justify-content-center col-12`}
          >
            <div data-aos="fade-left" className="col-8">
              <label htmlFor="email"> Email</label>
              <input
                type="email"
                name="email"
                defaultValue={initialState.email}
                onChange={handleChangeUserSignIn}
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
                  onChange={handleChangeUserSignIn}
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
            {errors.errorMessage && (
              <small style={{ color: "red" }}> {errors.errorMessage} </small>
            )}
            <div data-aos="zoom-in" className="mt-5 mb-3 col-8">
              <button onClick={handleSigin} className="main-btn col-12">
                {" "}
                Sign in{" "}
              </button>
            </div>
          </form>
        )}

        {!userSignUP ? (
          <div className="d-flex align-items-center justify-content-center col-12 mt-3">
            {" "}
            <h6 className="text-center">
              {" "}
              You be Jonny just come?{" "}
              <button
                onClick={() => setUserSignUP(true)}
                className="btn-outline"
              >
                {" "}
                Oya Sign Up
              </button>{" "}
            </h6>
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-center col-12 mt-3">
            {" "}
            <h6 className="text-center">
              {" "}
              You be we we?{" "}
              <button
                onClick={() => setUserSignUP(false)}
                className="btn-outline"
              >
                {" "}
                Oya Sign in
              </button>{" "}
            </h6>
          </div>
        )}
      </main>
    </div>
  );
}

export default SignUp;
