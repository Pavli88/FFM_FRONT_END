import React, { useEffect, useState } from "react";
import "./PortfolioSettingsGeneral.css";
import ToogleSwitch from "../../../../../components/Buttons/SliderButton/ToogleSwitch";
import InputField from "../../../../../components/InputField/InputField";
import fetchAPI from "../../../../../config files/api";

const PortfolioSettingsGeneral = ({ portfolioId }) => {
    const [portfolioData, setPortfolioData] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchPortfolio = async () => {
    //         const res = await fetchAPI.get(`/portfolios/${portfolioId}`);
    //         setPortfolioData(res.data);
    //         setLoading(false);
    //     };
    //     fetchPortfolio();
    // }, [portfolioId]);
    //
    // const handleChange = (key, value) => {
    //     setPortfolioData(prev => ({ ...prev, [key]: value }));
    // };
    //
    // const handleSave = async () => {
    //     await fetchAPI.post(`/portfolios/${portfolioId}/update`, portfolioData);
    //     alert("Saved!");
    // };
    //
    // if (loading || !portfolioData) return <div>Loading...</div>;

    return (
        <div className="widget-container">
            <div className="form-grid">
                {/* General Info */}
                <div className="card">
                    <h3>General Info</h3>
                    <InputField label="Portfolio Name"/>
                    <InputField label="Portfolio Code"/>
                    <InputField label="Portfolio Type"  />
                    <InputField label="Currency" />
                    <InputField label="Inception Date" type="date" />
                    <InputField label="Status"  />
                    <InputField label="Description"  />
                </div>

                {/* Ownership & Admin */}
                <div className="card">
                    <h3>Ownership & Admin</h3>
                    <InputField label="User ID" />
                    <InputField label="Owner" />
                    <InputField label="Manager" />
                    <InputField label="Creation Date" type="date" />
                    <InputField label="Termination Date" type="date" />
                    <ToogleSwitch label="Is Terminated" />
                </div>

                {/* Functional Toggles */}
                <div className="card">
                    <h3>Functional Settings</h3>
                    <ToogleSwitch label="Trading Allowed"/>
                    <ToogleSwitch label="Multicurrency Allowed" />
                    <ToogleSwitch label="Weekend Valuation"  />
                    <ToogleSwitch label="Calc Holding" />
                </div>

                {/* Performance / Valuation */}
                <div className="card">
                    <h3>Performance & Valuation</h3>
                    <InputField label="Perf Start Date" type="date" />
                    <InputField label="Valuation Frequency" />
                    <InputField label="Pricing Tolerance" />
                </div>
            </div>

            <button className="save-button">Save Changes</button>
        </div>
    );
};

export default PortfolioSettingsGeneral;


// import {useState} from "react";
//
// const PortfolioSettingsGeneral = ({ portfolioData }) => {
//     const [portfolio, setPortfolio] = useState(portfolioData);
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPortfolio({ ...portfolio, [name]: value });
//     };
//
//     const handleSubmit = async () => {
//         // try {
//         //     await axios.put(`${server}/portfolio/${portfolioId}/`, portfolio);
//         //     alert("Portfolio updated successfully!");
//         // } catch (err) {
//         //     alert("Error updating portfolio.");
//         // }
//     };
//
//     // if (loading) return <p>Loading...</p>;
//     // if (error) return <p>{error}</p>;
//
//     return (
//         <div className={'card'}>
//             <div>
//                 <h2 className="text-xl font-bold mb-4">Edit Portfolio</h2>
//                 {Object.keys(portfolio).map((key) => (
//                     <div key={key} className="mb-2">
//                         <label className="block text-sm font-medium capitalize">{key.replace("_", " ")}</label>
//                         <input
//                             type="text"
//                             name={key}
//                             value={portfolio[key] || ""}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 ))}
//                 <button onClick={handleSubmit} className="mt-4 w-full">Save Changes</button>
//             </div>
//         </div>
//     );
// };
//
// export default PortfolioSettingsGeneral;