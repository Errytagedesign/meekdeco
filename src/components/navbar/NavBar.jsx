import React, { useState } from "react";
import Image from "next/image";

// icons
import { BsChevronDown } from "react-icons/bs";

// styles
import styles from "./NavBar.module.scss";

// images
import images from "../../export/images";
import Link from "next/link";

function NavBar() {
  const [navbar, setNavbar] = useState(true);
  const [activeItem, setActiveItem] = useState(false);

  const handleNav = (id) => {
    setNavbar(!navbar);
    // setActiveItem(!activeItem);
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
            className="col-8 col-lg-3"
          >
            <Image src={images.Logo} alt=" Wolf Pack Logo" />
          </Link>
          <div
            className={`col-12 col-lg-9 justify-content-end d-flex flex-column flex-lg-row ${
              navbar ? styles.displayNav : styles.navMove
            }`}
          >
            <aside>
              <section
                className={`${styles.navItems} "col-12  d-flex flex-column flex-lg-row justify-content-between text-center "`}
              >
                {NavLinks.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      handleNav(item.id);
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
    </div>
  );
}

export default NavBar;

// "d-flex flex-column flex-lg-row justify-content-between"
