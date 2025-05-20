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
                <div className=" portfolio-settings-card card-general">
                    <h3 className="widget-title">Portfolio Info</h3>
                    <div className="widget-body">
                        <InputField label="Portfolio Name" value={formData.portfolio_name}/>
                        <InputField label="Portfolio Code" value={formData.portfolio_code}/>
                        <InputField label="Portfolio Type" value={formData.portfolio_type}/>
                        <InputField label="Currency" value={formData.currency}/>
                        <InputField label="ID" value={formData.id}/>
                        <InputField label="Status" value={formData.status}/>
                    </div>
                </div>

                 {/* Ownership & Admin */}
                <div className=" portfolio-settings-card card-ownership">
                    <h3 className="widget-title">Ownership & Public Status</h3>
                    <div className="widget-body">
                        <InputField label="Owner" value={formData.owner}/>
                        <InputField label="User ID" value={formData.user_id}/>
                        <InputField label="Manager" value={formData.manager}/>
                        <ToogleSwitch label="Terminated"
                                      isChecked={formData.is_terminated === true} // Ensures it's only true, not null
                                      onToggle={() => handleInputChange({
                                          target: {
                                              name: 'is_terminated',
                                              type: 'checkbox',
                                              checked: !formData.is_terminated // Set to null when unchecked
                                          }
                                      })}/>
                        <ToogleSwitch label="Public"
                                      isChecked={formData.public === true} // Ensures it's only true, not null
                                      onToggle={() => handleInputChange({
                                          target: {
                                              name: 'public',
                                              type: 'checkbox',
                                              checked: !formData.public // Set to null when unchecked
                                          }
                                      })}/>
                    </div>
                </div>

                {/* Dates */}
                <div className=" portfolio-settings-card">
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
                <div className=" portfolio-settings-card card-functional">
                    <h3 className="widget-title">Trade Settings</h3>
                    <div className="widget-body">
                        <InputField label="Pricing tolerance" value={formData.pricing_tolerance}/>
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
                            label="External Signals Allowed"
                            isChecked={formData.allow_external_signals === true} // Ensures it's only true, not null
                            onToggle={() => handleInputChange({
                                target: {
                                    name: 'allow_external_signals',
                                    type: 'checkbox',
                                    checked: !formData.allow_external_signals // Set to null when unchecked
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