import React from "react";

function TabContents({ id, activeTab, comps, styles }) {
  return activeTab === id ? (
    <div className={styles.tabContents}> {comps} </div>
  ) : (
    ""
  );
}

export default TabContents;
