import { useEffect } from "react";

import "@/styles/globals.css";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer, NavBar } from "@/export/allComps";
import { Provider } from "react-redux";
import store from "./../stores/store";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const AOS = require("aos");
  useEffect(() => {
    AOS.init();
  }, [AOS]);
  const router = useRouter();
  const path = router.pathname;

  return (
    <Provider store={store}>
      {path !== "/dashboard/adminpanel" && <NavBar />}
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}
