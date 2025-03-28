import { useState} from "react";
import "./PortfolioSettingsGeneral.css";
import ToogleSwitch from "../../../../../components/Buttons/SliderButton/ToogleSwitch";
import InputField from "../../../../../components/InputField/InputField";

const PortfolioSettingsGeneral = ({portfolioId}) => {
    const [portfolioData, setPortfolioData] = useState(null);
    const [loading, setLoading] = useState(true);

    return (
        <div className="widget-container">
            <div className="form-grid">
                {/* General Info */}
                <div className="card portfolio-settings-card card-general">
                    <h3 className="widget-title">Portfolio Info</h3>
                    <InputField label="Portfolio Name"/>
                    <InputField label="Portfolio Code"/>
                    <InputField label="Portfolio Type"/>
                    <InputField label="Currency"/>
                    <InputField label="Status"/>
                    <ToogleSwitch label="Terminated"/>
                </div>

                 {/* Ownership & Admin */}
                <div className="card portfolio-settings-card card-ownership">
                    <h3 className="widget-title">Ownership & Public Status</h3>
                    <InputField label="Owner"/>
                    <InputField label="Manager"/>
                     <ToogleSwitch label="Public"/>
                </div>

                {/* Dates */}
                <div className="card portfolio-settings-card">
                    <h3 className="widget-title">Dates</h3>
                    <InputField label="Creation Date" type="date"/>
                    <InputField label="Inception Date" type="date"/>
                    <InputField label="Termination Date" type="date"/>
                    <InputField label="Performance Start Date" type="date"/>
                </div>

                {/* Functional Settings */}
                <div className="card portfolio-settings-card card-functional">
                    <h3 className="widget-title">Trade Settings</h3>
                    <ToogleSwitch label="Trading Allowed"/>
                    <ToogleSwitch label="Multicurrency Allowed"/>
                </div>


            </div>
            <button className="save-button">Save Changes</button>
        </div>
    );
};

export default PortfolioSettingsGeneral;