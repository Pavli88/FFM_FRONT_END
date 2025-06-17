import React from "react";
import { BsGear, BsExclamationDiamond, BsReverseLayoutTextSidebarReverse, BsColumns, BsGraphUp } from 'react-icons/bs';


export const PortfolioSidebarData = [
  {
    title: "Overview",
    path: "/portfolio/overview",
    icon: <BsColumns size={20}/>,
  },
  {
    title: "Transactions",
    path: "/portfolio/transactions",
    icon: <BsReverseLayoutTextSidebarReverse size={20}/>

  },
  {
    title: "Settings",
    path: "/portfolio/settings",
    icon: <BsGear size={20}/>

  },
];