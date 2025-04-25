import React, {useEffect, useState} from "react";
import "./PortfolioSettingsGeneral.css";
import ToogleSwitch from "../../../../../components/Buttons/SliderButton/ToogleSwitch";
import InputField from "../../../../../components/InputField/InputField";
import fetchAPI from "../../../../../config files/api";

const PortfolioSettingsGeneral = ({portfolioData}) => {
    // const [portfolioData, setPortfolioData] = useState(null);
    // const [loading, setLoading] = useState(true);

    const [status, setStatus] = useState(''); // '', 'success', or 'error'
    const [formData, setFormData] = useState(portfolioData);

    useEffect(() => {
        setFormData(portfolioData);
    }, [portfolioData])



    const updatePortfolio = async () => {
        console.log(formData)
        try {
            const response = await fetchAPI.put('portfolios/update/portfolio/', formData);
            setStatus('success');
        } catch (err) {
            setStatus('error');
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div className="widget-container">
            <div className="form-grid">
                {/* General Info */}
                <div className="card portfolio-settings-card card-general">
                    <h3 className="widget-title">Portfolio Info</h3>
                    <div className="widget-body">
                        <InputField label="Portfolio Name"/>
                        <InputField label="Portfolio Code"/>
                        <InputField label="Portfolio Type"/>
                        <InputField label="Currency"/>
                        <InputField label="Status"/>
                        <ToogleSwitch label="Terminated"/>
                    </div>
                </div>

                 {/* Ownership & Admin */}
                <div className="card portfolio-settings-card card-ownership">
                    <h3 className="widget-title">Ownership & Public Status</h3>
                    <div className="widget-body">
                        <InputField label="Owner"/>
                        <InputField label="Manager"/>
                        <ToogleSwitch label="Public"/>
                    </div>
                </div>

                {/* Dates */}
                <div className="card portfolio-settings-card">
                    <h3 className="widget-title">Dates</h3>
                    <div className="widget-body">

                        <InputField
                            id="creation_date"
                            type="date"
                            value={formData.creation_date}
                            // onChange={(e) => handleChange('incpetion_date', e.target.value)}
                            label="Creation Date"
                            // min={formData.inception_date}
                            disabled
                        />

                        <InputField
                            id="inception_date"
                            type="date"
                            value={formData.inception_date}
                            onChange={(e) => handleChange('incpetion_date', e.target.value)}
                            label="Inception Date"
                            // min={formData.inception_date}
                            required
                        />

                        <InputField
                            id="perf_start_date"
                            type="date"
                            value={formData.perf_start_date}
                            onChange={(e) => handleChange('perf_start_date', e.target.value)}
                            label="Performance Start Date"
                            min={formData.inception_date}
                            required
                        />

                        <InputField label="Termination Date" type="date"/>

                    </div>
                </div>

                {/* Functional Settings */}
                <div className="card portfolio-settings-card card-functional">
                    <h3 className="widget-title">Trade Settings</h3>
                    <div className="widget-body">
                        <ToogleSwitch
                            label="Trading Allowed"
                            isChecked={formData.trading_allowed === true} // Ensures it's only true, not null
                            onToggle={() => handleInputChange({
                                target: {
                                    name: 'trading_allowed',
                                    type: 'checkbox',
                                    checked: !formData.trading_allowed // Set to null when unchecked
                                }
                            })}
                        />

                         <ToogleSwitch
                            label="Multicurrency Allowed"
                            isChecked={formData.multicurrency_allowed === true} // Ensures it's only true, not null
                            onToggle={() => handleInputChange({
                                target: {
                                    name: 'multicurrency_allowed',
                                    type: 'checkbox',
                                    checked: !formData.multicurrency_allowed // Set to null when unchecked
                                }
                            })}
                        />
                    </div>
                </div>


            </div>
            <button className="save-button" onClick={() => updatePortfolio()}>Save Changes</button>
        </div>
    );
};

export default PortfolioSettingsGeneral;