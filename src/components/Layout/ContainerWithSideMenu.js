import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "./ContainerWithSideMenu.css"; // Import CSS file

const ContainerWithSideMenu = ({ panel, mainArea, sidebarWidth = "300px"  }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div>
            {/* Sidebar */}
            <div className={`sidebar ${isMenuOpen ? "open" : ""}`} style={{
                    width: isMenuOpen ? sidebarWidth : "50px"
                }}>
                {isMenuOpen && panel}
                <div
                    className="toggle-button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <BsChevronLeft /> : <BsChevronRight />}
                </div>
            </div>

            {/* Main Content */}
            <div className={`main-content ${isMenuOpen ? "open" : ""}`} style={{
                    marginLeft: isMenuOpen ? sidebarWidth : "50px"
                }}>
                {mainArea}
            </div>
        </div>
    );
};

export default ContainerWithSideMenu;