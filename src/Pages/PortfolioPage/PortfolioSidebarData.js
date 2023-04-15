import React from "react";
import { BsGrid3X2Gap, BsExclamationDiamond } from 'react-icons/bs';
import { TiChartPieOutline } from "react-icons/ti";

export const PortfolioSidebarData = [
  {
    title: "Dashboard",
    path: "/portfolio/dashboard",
    icon: <TiChartPieOutline size={20}/>,
  },
  {
    title: "Holdings",
    path: "/portfolio/holdings",
    icon: <BsGrid3X2Gap size={20} className="rounded-circle"/>
  },
  {
    title: "Transactions",
    path: "/portfolio/transactions",
    icon: <BsExclamationDiamond size={20}/>

  },
  {
    title: "Risk",
    path: "/portfolio/risk",
    icon: <BsExclamationDiamond size={20}/>

  },
  {
    title: "Return",
    path: "/portfolio/return",
    icon: <BsExclamationDiamond size={20}/>

  },
  {
    title: "Settings",
    path: "/portfolio/settings",
    icon: <BsExclamationDiamond size={20}/>

  },
  {
    title: "Import",
    path: "",
    icon: <BsExclamationDiamond size={20}/>

  }
];