import { useEffect } from "react";

import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";

export default function App({ Component, pageProps }) {
  const AOS = require("aos");
  useEffect(() => {
    AOS.init();
  }, [AOS]);

  return <Component {...pageProps} />;
}
