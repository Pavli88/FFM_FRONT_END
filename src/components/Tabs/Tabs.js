import React, { useState } from "react";
import "./Tabs.css"; // Import the CSS file

const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div className="tab-container">
            <div className="tab-buttons">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`tab-button ${tab.id === activeTab ? "active" : ""}`}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="tab-content">
                {tabs.map(
                    (tab) =>
                        tab.id === activeTab && (
                            <div key={tab.id} className="tab-panel">
                                {tab.content}
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

export default Tabs;
