import "./PortfolioProcessWidget.css";
import InputField from "../../../../../components/InputField/InputField";
import ToogleSwitch from "../../../../../components/Buttons/SliderButton/ToogleSwitch";
import React, {useState} from "react";

const PortfolioProcessWidget = ({portfolioData}) => {
    const [formData, setFormData] = useState(portfolioData);

    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };


    return (
        <div className="widget-container">
            <div className="form-grid">

                <div className=" portfolio-settings-card card-valuation">
                    <h3 className="widget-title">Valuation</h3>
                    <div className="widget-body">
                        <InputField label="Valuation frequency" value={formData.valuation_frequency}/>
                        <ToogleSwitch label="Weekend Valuation"
                                      isChecked={formData.weekend_valuation === true} // Ensures it's only true, not null
                                      onToggle={() => handleInputChange({
                                          target: {
                                              name: 'weekend_valuation',
                                              type: 'checkbox',
                                              checked: !formData.weekend_valuation // Set to null when unchecked
                                          }
                                      })}/>
                        <ToogleSwitch label="Calculate Holding"
                                      isChecked={formData.calc_holding === true} // Ensures it's only true, not null
                                      onToggle={() => handleInputChange({
                                          target: {
                                              name: 'calc_holding',
                                              type: 'checkbox',
                                              checked: !formData.calc_holding // Set to null when unchecked
                                          }
                                      })}/>
                    </div>
                </div>

                <div className=" portfolio-settings-card card-totalreturn">
                    <h3 className="widget-title">Total return</h3>
                    <div className="widget-body">

                    </div>
                </div>

                <div className=" portfolio-settings-card">
                    <h3 className="widget-title">Attribution</h3>
                    <div className="widget-body">

                    </div>
                </div>

            </div>


            <button className="save-button">Save Changes</button>
        </div>
    );
};

export default PortfolioProcessWidget;