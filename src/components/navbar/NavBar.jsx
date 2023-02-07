import React, { useState } from "react";
import Image from "next/image";

// icons
import { BsChevronDown } from "react-icons/bs";

// styles
import styles from "./NavBar.module.scss";

// images
import images from "../../export/images";
import Link from "next/link";
import SignUp from "../auth/signUp/SignUp";

function NavBar() {
  const [navbar, setNavbar] = useState(true);
  const [activeItem, setActiveItem] = useState(false);
  const [show, setShow] = useState(false);

  const handleNav = () => {
    setNavbar(!navbar);
  };

  const handleClose = () => {
    setShow(!show);
  };
  const handleActive = (id) => {
    setActiveItem({
      [id]: !activeItem[id],
    });
  };

  const NavLinks = [
    { id: 1, name: "Products", url: "/products" },
    {
      id: 2,
      name: "About us",
      url: "/about",
    },
    { id: 3, name: "Contact us", url: "/contact" },
  ];

  // console.log(NavLinks[0].explore);

  return (
    <div>
      <section className={styles.nav_container}>
        <nav className="d-flex container flex-row align-items-center justify-content-between">
          {/* Logo */}
          <Link
            onClick={() => setActiveItem(false)}
            href="/"
            className="col-7 col-lg-3"
          >
            <Image src={images.Logo} alt=" Wolf Pack Logo" />
          </Link>
          <div
            className={`col-12 col-lg-8 d-flex flex-column flex-lg-row ${
              navbar ? styles.displayNav : styles.navMove
            }`}
          >
            <aside className="col-12 d-flex flex-column flex-lg-row ">
              <section
                className={`${styles.navItems} col-12 col-lg-6  d-flex flex-column flex-lg-row justify-content-between  `}
              >
                {NavLinks.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      handleActive(item.id);
                    }}
                    className={`${
                      activeItem[item.id] ? styles.active : styles.notActive
                    }`}
                  >
                    <Link className={styles.Links} href={item.url}>
                      {item.name}
                    </Link>
                  </div>
                ))}
              </section>

              <div className="d-flex flex-column flex-lg-row justify-content-between col-12 col-lg-4">
                <div className="me-3 col-12 col-lg-6">
                  {" "}
                  <input
                    className="form-control col-12"
                    type="search"
                    placeholder="search..."
                  />{" "}
                </div>

                <div className="d-flex flex-row justify-content-between mt-3 mt-lg-0 col-12 col-lg-6 ">
                  <Image src={images.cart} alt="" />
                  <Image src={images.heart} alt="" />
                  <Image
                    onClick={() => setShow(!show)}
                    src={images.profile}
                    alt=""
                  />
                </div>
              </div>
            </aside>
          </div>
          {/* Hambuger icon */}
          <div
            onClick={handleNav}
            className={navbar ? styles.ham : styles.open}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </section>

      {show && <SignUp close={handleClose} />}
    </div>
  );
}

export default NavBar;

// "d-flex flex-column flex-lg-row justify-content-between"
