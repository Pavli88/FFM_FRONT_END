import {useContext, useState} from "react";
import './PortfolioSettingsPage.css'
import {Nav} from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import PortfolioContext from "../../../../context/portfolio-context";
import Tabs from "../../../../components/Tabs/Tabs"
import PortfolioTradeRouting from "./PortfolioTradeRouting/PortfolioTradeRouting";
import fetchAPI from "../../../../config files/api";
import PortfolioSettingsGeneral from "./PortfolioSettingsGeneral/PortfolioSettingsGeneral";
import PortfolioProcessWidget from "./PortfolioProcessWidget/PortfolioProcessWidget";

const PortfolioSettingsPage = (props) => {
    const portfolioData = useContext(PortfolioContext).selectedPortfolio;

    const InputField = (props) => {
        return (
            <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
                <div className={'portfolio-settings-name-field'}>
                    <Nav.Link href="#" disabled>
                        {props.name}
                    </Nav.Link>
                </div>
                <div style={{width: '100%'}}>
                    <Form.Control
                        type={props.style}
                        style={{height: '100%'}}
                        placeholder={props.data}
                        disabled={props.disabled}
                    />
                </div>
            </div>
        )
    };

    const savePortfolioData = () => {
        fetchAPI(
        ).post('portfolios/update/portfolio/', portfolioData)
            .then(data => alert(data.data.response))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    const currencyOptions = [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'HUF', label: 'HUF' },
    ]

    // const valuationParameters = <div style={{width: '100%', paddingTop: 15}}>
    //     <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
    //         <div className={'portfolio-settings-name-field'} style={{width: 500}}>
    //             <Nav.Link href="#" disabled>
    //                 Valuation Frequency
    //             </Nav.Link>
    //         </div>
    //         <div style={{width: '100%'}}>
    //             <Select style={{height: '100%'}}
    //                     value={portfolioData.valuation_frequency}
    //                     options={[
    //                         {value: 'Daily', label: 'Daily'},
    //                         {value: 'Weekly', label: 'Weekly'},
    //                         {value: 'Monthly', label: 'Monthly'},
    //                     ]}
    //                     placeholder={portfolioData.valuation_frequency}
    //                     onChange={(e) => setPortfolioData({
    //                         ...portfolioData,
    //                         valuation_frequency: e.value
    //                     })}
    //             >
    //             </Select>
    //         </div>
    //     </div>
    //
    //     <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
    //         <div className={'portfolio-settings-name-field'} style={{width: 500}}>
    //             <Nav.Link href="#" disabled>
    //                 Weekend Valuation
    //             </Nav.Link>
    //         </div>
    //         <div style={{width: '100%'}}>
    //             <Select style={{height: '100%'}}
    //                     value={portfolioData.weekend_valuation === 1 ? 'Eneabled' : 'Disabled'}
    //                     options={[
    //                         {value: 1, label: 'Eneabled'},
    //                         {value: 0, label: 'Disabled'},
    //                     ]}
    //                     placeholder={portfolioData.weekend_valuation === 1 ? 'Eneabled' : 'Disabled'}
    //                     onChange={(e) => setPortfolioData({
    //                         ...portfolioData,
    //                         weekend_valuation: e.value
    //                     })}
    //             >
    //             </Select>
    //         </div>
    //     </div>
    //
    //     <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
    //         <div className={'portfolio-settings-name-field'} style={{width: 500}}>
    //             <Nav.Link href="#" disabled>
    //                 Holding Calculation
    //             </Nav.Link>
    //         </div>
    //         <div style={{width: '100%'}}>
    //             <Select style={{height: '100%'}}
    //                     value={portfolioData.calc_holding === true ? 'Eneabled' : 'Disabled'}
    //                     options={[
    //                         {value: true, label: 'Eneabled'},
    //                         {value: false, label: 'Disabled'},
    //                     ]}
    //                     placeholder={portfolioData.calc_holding === true ? 'Eneabled' : 'Disabled'}
    //                     onChange={(e) => setPortfolioData({
    //                         ...portfolioData,
    //                         calc_holding: e.value
    //                     })}
    //             >
    //             </Select>
    //         </div>
    //     </div>
    //
    //     <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
    //         <div className={'portfolio-settings-name-field'} style={{width: 500}}>
    //             <Nav.Link href="#" disabled>
    //                 Days of Missing Price Tolerance
    //             </Nav.Link>
    //         </div>
    //         <div style={{width: '100%'}}>
    //             <input placeholder={portfolioData.pricing_tolerance} type={'number'} onChange={(e) => setPortfolioData({
    //                 ...portfolioData,
    //                 pricing_tolerance: e.target.value
    //             })}/>
    //         </div>
    //     </div>
    //
    // </div>

    // const performanceParameters = <div>
    //     <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
    //         <div className={'portfolio-settings-name-field'}>
    //             <Nav.Link href="#" disabled>
    //                 Performance Start Date
    //             </Nav.Link>
    //         </div>
    //         <div style={{width: '100%'}}>
    //             <div style={{width: '100%'}}>
    //                 <Form.Control
    //                     type={'date'}
    //                     style={{height: '100%'}}
    //                     value={portfolioData.perf_start_date}
    //                     onChange={(e) => setPortfolioData({...portfolioData, 'perf_start_date': e.target.value})}
    //                 />
    //             </div>
    //         </div>
    //     </div>
    // </div>

    const tabs = [
        {
            id: 1,
            label: "General",
            content: (
                <PortfolioSettingsGeneral portfolioData={portfolioData}/>
            )
        },
        {
            id: 2, label: "Processes", content:
                <PortfolioProcessWidget portfolioData={portfolioData}/>
        },
        {
            id: 3, label: "Trade Routing", content: <div style={{display: 'flex', width: '100%'}}>
                <div style={{height: '100%', width: '100%'}}>
                   <PortfolioTradeRouting/>
                </div>
            </div>
        },
    ];


    return (
        <div className="page-wrapper">
            <div className="portfolio-settings-page-container" style={{padding: 20}}>
                <Tabs tabs={tabs}/>
            </div>
        </div>
    );
};

export default PortfolioSettingsPage;