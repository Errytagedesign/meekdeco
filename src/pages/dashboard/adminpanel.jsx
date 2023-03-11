import React, { useEffect, useState } from "react";
import { selectUsers } from "@/features/loginSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import TabContents from "@/components/Tabs/TabContents";
import TabTitle from "@/components/Tabs/TabTitle";
import { TabsData } from "@/components/Tabs/TabsData";

import Link from "next/link";
import Image from "next/image";
import images from "@/export/images";

// styles
import styles from "@/components/Tabs/TabStyles.module.scss";

function AdminPanel() {
  const [activeTab, setActiveTab] = useState("tab1");
  const currentUser = useSelector(selectUsers);
  const [loading, setLoading] = useState(false);

  // console.log(currentUser);

  // useEffect(() => {
  //   setLoading(true);
  //   if (!currentUser) {
  //     console.log("not loggedin");
  //     redirect.push("/");
  //   }
  //   setLoading(false);
  // }, [currentUser, redirect]);

  return (
    <main className={`${styles.dashboard} d-flex flex-column `}>
      {/* Logo */}
      <header className="d-flex flex-row p-3">
        <Link href="/" className="col-2">
          <Image src={images.Logo} alt=" Meek deco Logo" />
        </Link>
      </header>

      <main className="d-flex flex-column flex-md-row">
        <article className={`${styles.tabs} col-12 col-md-2`}>
          <section
            className={`${styles.tabTitleContainer} d-flex flex-row flex-md-column justify-content-between`}
          >
            {TabsData[0].TabTitle.map((tab) => (
              <section key={tab.id} className={`${styles.tabTitle} `}>
                <TabTitle
                  id={tab.id}
                  title={tab.title}
                  icon={tab.icon}
                  styles={styles}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </section>
            ))}
          </section>
        </article>
        <aside
          className={`${styles.tabContents} d-flex flex-column col-12 col-md-9`}
        >
          {TabsData[0].TabContents.map((tab) => (
            <section key={tab.id} className={`${styles.tabContents} `}>
              <TabContents
                id={tab.id}
                styles={styles}
                activeTab={activeTab}
                comps={tab.comp}
              />
            </section>
          ))}
        </aside>
      </main>
    </main>
  );
}

export default AdminPanel;
