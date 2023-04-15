import React from "react";
import { BsCalculator, BsGrid3X2Gap, BsExclamationDiamond, BsBarChart, BsGear } from 'react-icons/bs';
import { TiChartPieOutline } from "react-icons/ti";
 
export const RiskSidebarData = [
  {
    title: "Dashboard",
    path: "/robot/dashboard",
    icon: <TiChartPieOutline size={20}/>,
  },
  {
    title: "Calculations",
    icon: <BsCalculator size={20} className="rounded-circle"/>,

    subNav: [
      {
        title: "Balance",
        cName: "sub-nav"
      },
      {
        title: "Pricing",
        cName: "sub-nav"
      },
      {
        title: "Monthly Return",
        cName: "sub-nav"
      },
    ],
  },
  {
    title: "Transactions",
    path: "/risk/transactions",
    icon: <BsGrid3X2Gap size={20} className="rounded-circle"/>
  },
  {
    title: "Risk",
    path: "/risk/risk",
    icon: <BsExclamationDiamond size={20}/>

  },
];