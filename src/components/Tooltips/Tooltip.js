import { useState } from "react";
import { FiInfo } from "react-icons/fi";
import "./Tooltip.css";

const Tooltip = ({ text }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="tooltip-container">
            <FiInfo
                className="info-icon"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            />
            {showTooltip && <div className="tooltip-visible">{text}</div>}
        </div>
    );
};

export default Tooltip;
