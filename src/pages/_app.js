import { useEffect } from "react";

import "@/styles/globals.css";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer, NavBar } from "@/export/allComps";
import { Provider } from "react-redux";
import store, { wrapper } from "./../stores/store";
import { useRouter } from "next/router";

const App = ({ Component, pageProps }) => {
  const AOS = require("aos");
  useEffect(() => {
    AOS.init();
  }, [AOS]);
  const router = useRouter();
  const path = router.pathname;

  return (
    <>
      {path !== "/dashboard/adminpanel" && <NavBar />}
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default wrapper.withRedux(App);
