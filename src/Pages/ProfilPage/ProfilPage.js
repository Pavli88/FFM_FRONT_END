// Bootstrap
import Container from "react-bootstrap/Container";

import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import BrokerAccounts from "./BrokerAccounts/BrokerAccounts";
import ProfilePortfolios from "./ProfilePortfolios/ProfilePortfolios";
import NewBrokerAccount from "./BrokerAccounts/NewBrokerAccount";
import PortfolioGroup from "./PortfolioGroup/PortfolioGroup";
import NewPortfolio from "./ProfilePortfolios/NewPortfolio";
import CashManagement from "./CashManagement/CashManagement";
import CashBalances from "./CashBalances/CashBalances";

import UserContext from "../../context/user-context";
import ServerContext from "../../context/server-context";
import CashflowContext from "./context/cashflow-context";
import {useContext, useEffect, useState} from "react";
import axios from "axios";


const ProfilPage = () => {
    const [newCashflow, setNewCashflow] = useState(0);
    const [cashBalances, setCashbalances] = useState([]);
    const generalParameters = {
        user: useContext(UserContext).user,
        server: useContext(ServerContext).server
    };

    useEffect(() => {
            axios.get(generalParameters.server + 'portfolios/get/main_portfolio_cashflow/', {
                params: {
                    portfolio_code: 'MAIN_' + generalParameters.user.toUpperCase(),
                }
            })
                .then(response => setCashbalances(response.data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [newCashflow]
    );

    return (
        <CashflowContext.Provider value={{
            cashFlowNumber : newCashflow,
            saveNewCashflow: setNewCashflow,
        }}>
            <div className={'page-container'}>
                <div style={{display: 'flex', height: '300px'}}>
                    <CashManagement parameters={{...generalParameters}}/>
                    <CashBalances data={cashBalances}/>
                </div>
                <div style={{width: '100%', height: '600px'}}>
                    <Tabs
                        defaultActiveKey="accounts"
                        id="profile-tab"
                        className="mb-3"
                    >
                        <Tab eventKey="accounts" title="Broker Accounts">
                            <div style={{display: 'flex', width: '100%', height: '500px'}}>
                                <div style={{width: '300px', marginLeft: 20, marginRight: 10}}>
                                    <NewBrokerAccount parameters={{...generalParameters}}/>
                                </div>
                                <div style={{width: '100%', marginLeft: 10, marginRight: 20}}>
                                    <BrokerAccounts parameters={{...generalParameters}}/>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="portfolios" title="Portfolios">
                            <div style={{display: 'flex', width: '100%', height: '500px'}}>
                                <div style={{width: '500px', marginLeft: 20, marginRight: 10}}>
                                    <NewPortfolio parameters={{...generalParameters}}/>
                                </div>
                                <div style={{width: '500px', marginLeft: 20, marginRight: 10}}>
                                    <PortfolioGroup/>
                                </div>
                                <div style={{width: '100%', marginLeft: 10, marginRight: 20}}>
                                    <ProfilePortfolios/>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </CashflowContext.Provider>
    )
};
export default ProfilPage;