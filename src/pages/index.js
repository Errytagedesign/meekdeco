import Head from "next/head";
import { Manrope } from "@next/font/google";
import styles from "@/styles/Home.module.scss";
import { NavBar } from "@/export/allComps";
import { getAllDatas } from "@/hooks/firebaseFetching";
import Image from "next/image";

const manrope = Manrope({ subsets: ["latin"] });

export default function Home({ data }) {
  console.log(data);
  return (
    <>
      <Head>
        <title>MeekDeco Furniture Store</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style jsx global>{`
          html {
            font-family: ${manrope.style.fontFamily};
          }
        `}</style>
      </Head>
      <main className={`${styles.main} container`}>
        {/* <NavBar /> */}

        <h2> home </h2>

        <section className="d-flex flex-wrap">
          {data?.map((item) => (
            <section
              className={`${styles.container} d-flex flex-column col-12 col-md-4`}
              key={item.id}
            >
              <div className="col=12">
                <Image width={100} height={100} src={item.imageSrc} alt="" />
              </div>
              <h2> {item.productName} </h2>
            </section>
          ))}
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const data = await getAllDatas();
  // const data = await productsItems.json();
  return { props: { data } };
}
