import './PortfolioSidebarNavigation.css'
import {FaCog, FaChartBar, FaHome, FaExchangeAlt } from "react-icons/fa";

const PortfolioSidebarNavigation = ({ activeSection, setActiveSection }) => {
  const items = [
    { id: "overview", label: "Overview", icon: <FaHome /> },
    { id: "holdings", label: "Holdings", icon: <FaChartBar /> },
    { id: "transactions", label: "Transactions", icon: <FaExchangeAlt /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
    // később: "performance", "journal", stb.
  ];

  return (
    <div className="sidebar-nav">
      {items.map((item) => (
        <button
          key={item.id}
          className={`nav-icon ${activeSection === item.id ? "active" : ""}`}
          onClick={() => setActiveSection(item.id)}
          title={item.label}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};
export default PortfolioSidebarNavigation;