import React from "react";

import Image from "next/image";
import Link from "next/link";

import images from "../../export/images";
import styles from "./Footer.module.scss";

// icons
import {
  FaDiscord,
  FaTwitter,
  FaYoutube,
  FaTelegramPlane,
} from "react-icons/fa";

import { BiCopyright } from "react-icons/bi";

function Footer() {
  return (
    <div className={styles.footer}>
      <main className="d-flex flex-column flex-lg-row  justify-content-between align-items-center align-items-lg-start ">
        {/* Logo */}
        <section className="d-flex flex-column justify-content-between ">
          <Link href="/" className="d-flex flex-row col-10 mb-5">
            <div>
              {" "}
              <Image
                className="col-12"
                src={images.footerLogo}
                alt=" Meekdeco logo"
              />{" "}
            </div>
          </Link>

          <div className="d-flex flex-column mt-5">
            <p> Get in touch with us, Subscribe to our Newsletter!</p>

            <div className={`${styles.subscribe} d-flex flex-row `}>
              {" "}
              <input
                placeholder="Enter your email"
                className="col-7"
                type="email"
                name="email"
              />{" "}
              <input type="submit" className="main-btn mx-auto" />{" "}
            </div>
          </div>
        </section>

        <section className="d-flex flex-row justify-content-between ">
          {/* company */}
          <aside className="d-flex align-content-center col-12 col-lg-6 flex-column ">
            <h4> Company </h4>
            <Link href="/about">About</Link>
            <Link href="/products">Products</Link>
            <Link href="#"> Services</Link>
            <Link href="#"> Terms of services </Link>
            <Link href="/contact"> Privacy policy </Link>
          </aside>

          {/* contact */}
          <aside className="d-flex  flex-column ">
            <h4> Contact </h4>
            <Link href="/contact">Contact</Link>
            <Link href="/ivory"> Help center</Link>
          </aside>
        </section>
      </main>

      <article className="text-center ">
        <small>
          {" "}
          <BiCopyright /> 2022 MeekDeco,inc. All rights reserved
        </small>
      </article>
    </div>
  );
}

export default Footer;
