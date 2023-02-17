import React, { useState } from "react";
import TabContents from "./TabContents";
import { TabsData } from "./TabsData";
import TabTitle from "./TabTitle";

import styles from "./TabStyles.module.scss";

function Tabs() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <main className={styles.tabsContainer}>
      <section
        className={`${styles.tabTitleContainer} d-flex flex-row justify-content-between align-items-center`}
      >
        {TabsData[0].TabTitle.map((tab) => (
          <section key={tab.id} className={`${styles.tabTitle} col-6`}>
            <TabTitle
              title={tab.title}
              styles={styles}
              id={tab.id}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </section>
        ))}
      </section>
      <section className={`${styles.tabContents} d-flex flex-column`}>
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

export default Tabs;
