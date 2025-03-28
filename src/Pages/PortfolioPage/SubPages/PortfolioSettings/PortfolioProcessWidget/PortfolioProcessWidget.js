import "./PortfolioProcessWidget.css";
import InputField from "../../../../../components/InputField/InputField";
import ToogleSwitch from "../../../../../components/Buttons/SliderButton/ToogleSwitch";

const PortfolioProcessWidget = () => {
    return (
        <div className="widget-container">
            <div className="form-grid">

                <div className="card portfolio-settings-card card-valuation">
                    <h3 className="widget-title">Valuation</h3>
                    <InputField label="Teszt"/>
                    <InputField label="Teszt"/>
                    <InputField label="Teszt"/>
                    <ToogleSwitch label="Teszt"/>
                </div>

                <div className="card portfolio-settings-card card-totalreturn">
                    <h3 className="widget-title">Total return</h3>
                    <InputField label="Teszt"/>
                    <InputField label="Teszt"/>
                    <InputField label="Teszt"/>
                    <ToogleSwitch label="Teszt"/>
                </div>

                <div className="card portfolio-settings-card">
                    <h3 className="widget-title">Attribution</h3>
                    <InputField label="Teszt"/>
                    <InputField label="Teszt"/>
                    <InputField label="Teszt"/>
                    <ToogleSwitch label="Teszt"/>
                </div>

            </div>


            <button className="save-button">Save Changes</button>
        </div>
    );
};

export default PortfolioProcessWidget;