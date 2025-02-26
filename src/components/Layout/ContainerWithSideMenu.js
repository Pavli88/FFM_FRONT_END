import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "./ContainerWithSideMenu.css"; // Import CSS file

const ContainerWithSideMenu = ({ panel, mainArea }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div>
            {/* Sidebar */}
            <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
                {isMenuOpen && panel}
                <div
                    className="toggle-button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <BsChevronLeft /> : <BsChevronRight />}
                </div>
            </div>

            {/* Main Content */}
            <div className={`main-content ${isMenuOpen ? "open" : ""}`}>
                {mainArea}
            </div>
        </div>
    );
};

export default ContainerWithSideMenu;