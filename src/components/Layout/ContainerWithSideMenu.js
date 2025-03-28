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
                <div style={{display: "flex", height: '100%'}}>
                    <div className={'button-bar'} style={{padding: 10, width: 50, height: '100%', background: "white"}}>
                        <div className={'icon-button'}
                            // className="icon-button"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <BsChevronLeft size={20}/> : <BsChevronRight size={20}/>}
                        </div>
                    </div>
                    <div style={{padding: 10, width: '100%'}}>
                        {isMenuOpen && panel}
                    </div>
                </div>

            </div>

            {/* Main Content */}
            <div className={`main-content ${isMenuOpen ? "open" : ""}`} style={{
                    // marginLeft: isMenuOpen ? sidebarWidth : "50px"
                }}>
                {mainArea}
            </div>
        </div>
    );
};

export default ContainerWithSideMenu;