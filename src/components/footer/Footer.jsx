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
        <section className="col-12 col-md-8 logo col-lg-4 d-flex flex-column text-center text-lg-start mx-auto">
          <Link
            href="/"
            className="d-flex flex-row col-10 col-md-6 col-lg-12 mx-auto align-items-center "
          >
            <div>
              {" "}
              <Image
                className="col-12"
                src={images.Logo}
                alt=" Wolf Pack Logo"
              />{" "}
            </div>
          </Link>
          <p>
            {" "}
            Discover valuable digital collectibies with WolfPackHerd. Buy, sell,
            stop losses and earn more.
          </p>

          <div className="community-container d-none d-lg-flex flex-column">
            <h4> Community </h4>
            <div className="icon">
              {" "}
              <a
                href="https://twitter.com/WolfPackHerd"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <FaTwitter />{" "}
              </a>{" "}
              <a
                href="https://t.me/WolfPackHerdNetwork"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <FaTelegramPlane />{" "}
              </a>{" "}
              <a
                href="https://discord.gg/VdjEbbx86n "
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <FaDiscord />{" "}
              </a>{" "}
              <a
                href="https://youtube.com/WolfPackHerdNetwork"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <FaYoutube />{" "}
              </a>{" "}
            </div>
          </div>
        </section>

        <section className="d-flex flex-row justify-content-between col-12 col-lg-7">
          <div className="d-flex flex-column flex-lg-row justify-content-between col-lg-6">
            {/* company */}
            <aside className="d-flex align-content-center col-12 col-lg-6 flex-column ">
              <h4> Company </h4>
              <Link href="/about">About</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/careers"> Careers</Link>
              <Link href="/donate"> Donate </Link>
              <Link href="/contact"> Contact us </Link>
            </aside>

            {/* services */}
            <aside className="d-flex col-12 col-lg-6  flex-column ">
              <h4> Services </h4>
              <Link href="/ntfarts">
                NFT Arts <br /> <span>Coming soon </span>{" "}
              </Link>
              <Link href="/ivory">
                {" "}
                Ivory Tusk AUM <br /> <span>Coming soon </span>
              </Link>
              <Link href="/musicnft">
                {" "}
                Music NFT player <br /> <span>Coming soon </span>{" "}
              </Link>
              <Link href="/cryphrefcard">
                {" "}
                Cryphref Giftcard <br /> <span>Coming soon </span>{" "}
              </Link>
              <Link href="/deficalendar">
                {" "}
                Defi Calendar <br /> <span>Coming soon </span>{" "}
              </Link>
              <Link href="/doxme">
                {" "}
                Dox.me <br /> <span>Coming soon </span>{" "}
              </Link>
              <Link href="/nfcsaving">
                {" "}
                NFC savings promo card <br /> <span>Coming soon </span>{" "}
              </Link>
            </aside>
          </div>
        </section>
      </main>

      <article className="d-flex flex-column flex-lg-row justify-content-between align-items-center text-center text-lg-start">
        <small>
          {" "}
          <BiCopyright /> 2022 MeekDeco,inc. All rights reserved
        </small>
      </article>
    </div>
  );
}

export default Footer;
