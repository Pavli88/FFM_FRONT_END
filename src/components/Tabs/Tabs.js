import {useState} from "react";

const Tabs = ({tabs}) => {
    // State to manage the active tab
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    // Function to handle tab click
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div>
            {/* Render tab buttons */}
            <div className="tab-buttons">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={tab.id === activeTab ? "active" : ""}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Render the content for the active tab */}
            <div className="tab-content">
                {tabs.map(
                    (tab) =>
                        tab.id === activeTab && (
                            <div key={tab.id}>{tab.content}</div>
                        )
                )}
            </div>
        </div>
    );
};
export default Tabs;