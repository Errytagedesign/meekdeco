import { useEffect } from "react";

import "@/styles/globals.css";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer, NavBar } from "@/export/allComps";

export default function App({ Component, pageProps }) {
  const AOS = require("aos");
  useEffect(() => {
    AOS.init();
  }, [AOS]);

  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
