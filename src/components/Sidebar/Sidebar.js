import React, { useState } from "react";
import SubMenu from "./SubMenu";
import styles from "./Sidebar.module.css";

const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
 
  return (
    <div className={'card'}>
      <div className={styles.sidebarWrap}> 
          {props.sidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
          })}
      </div>
    </div>
  );
};
 
export default Sidebar;