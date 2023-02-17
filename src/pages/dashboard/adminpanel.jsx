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
    <main
      className={`${styles.dashboard} d-flex flex-row justify-content-between`}
    >
      <section className={styles.tabs}>
        {/* Logo */}
        <header className="col-12">
          <Link href="/">
            <Image src={images.Logo} alt=" Meek deco Logo" />
          </Link>
        </header>
        <section
          className={`${styles.tabTitleContainer} d-flex flex-column justify-content-between align-items-center`}
        >
          <section className={styles.tabsContainer}>
            {TabsData[0].TabTitle.map((tab) => (
              <section key={tab.id} className={`${styles.tabTitle}`}>
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
        </section>
      </section>
      <section className={`${styles.tabContents} d-flex flex-column col-9`}>
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
      </section>
    </main>
  );
}

export default AdminPanel;
