import React from "react";
import { BsGear, BsExclamationDiamond, BsReverseLayoutTextSidebarReverse, BsColumns, BsGraphUp } from 'react-icons/bs';
import { TiChartPieOutline } from "react-icons/ti";

export const PortfolioSidebarData = [
  {
    title: "Dashboard",
    path: "/portfolio/dashboard",
    icon: <BsColumns size={20}/>,
  },
  {
    title: "Holdings",
    path: "/portfolio/holdings",
    icon: <TiChartPieOutline  size={20} className="rounded-circle"/>
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
  {
    title: "Import",
    path: "",
    icon: <BsExclamationDiamond size={20}/>

  }
];