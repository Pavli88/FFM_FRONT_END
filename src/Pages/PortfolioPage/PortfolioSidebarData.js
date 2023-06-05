import React from "react";
import { BsGear, BsExclamationDiamond, BsReverseLayoutTextSidebarReverse, BsColumns, BsGraphUp } from 'react-icons/bs';


export const PortfolioSidebarData = [
  {
    title: "Dashboard",
    path: "/portfolio/dashboard",
    icon: <BsColumns size={20}/>,
  },
  {
    title: "Transactions",
    path: "/portfolio/transactions",
    icon: <BsReverseLayoutTextSidebarReverse size={20}/>

  },
  {
    title: "Risk",
    path: "/portfolio/risk",
    icon: <BsExclamationDiamond size={20}/>

  },
  {
    title: "Return",
    path: "/portfolio/return",
    icon: <BsGraphUp size={20}/>

  },
  {
    title: "Settings",
    path: "/portfolio/settings",
    icon: <BsGear size={20}/>

  },
];