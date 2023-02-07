import { useEffect } from "react";

import "@/styles/globals.css";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer, NavBar } from "@/export/allComps";
import { Provider } from "react-redux";
import store from "./../stores/store";

export default function App({ Component, pageProps }) {
  const AOS = require("aos");
  useEffect(() => {
    AOS.init();
  }, [AOS]);

  return (
    <Provider store={store}>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}
