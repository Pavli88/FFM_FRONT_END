import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from "react-bootstrap/Card";
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
    const generalParameters = {
        user: useContext(UserContext).user,
        server: useContext(ServerContext).server
    };

    return (
        <CashflowContext.Provider value={{
            cashFlowNumber : newCashflow,
            saveNewCashflow: setNewCashflow,
        }}>
            <div className={'page-container'}>
                <div style={{width: '100%', height: '600px', padding: 20}}>
                    <Card style={{width: '100%', height: '100%'}}>
                    <Tabs
                        defaultActiveKey="accounts"
                        id="profile-tab"
                        style={{height: '50px', paddingLeft: 10, width: '100%', margin: 0}}
                    >
                        <Tab eventKey="accounts" title="Broker Accounts">
                            <div style={{display: 'flex', width: '100%', height: '500px'}}>
                                <div style={{width: '500px', paddingLeft: 20, paddingRight: 20, paddingBottom: 20}}>
                                    <NewBrokerAccount parameters={{...generalParameters}}/>
                                </div>
                                <div style={{width: '100%', paddingRight: 20, paddingBottom: 20}}>
                                    <BrokerAccounts parameters={{...generalParameters}}/>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="portfolios" title="Portfolios">
                            <div style={{display: 'flex', width: '100%', height: '500px'}}>
                                <div style={{width: '500px', paddingLeft: 20, paddingRight: 20, paddingBottom: 20}}>
                                    <NewPortfolio parameters={{...generalParameters}}/>
                                </div>
                                <div style={{width: '500px', paddingRight: 20, paddingBottom: 20}}>
                                    <PortfolioGroup/>
                                </div>
                                <div style={{width: '100%', paddingRight: 20, paddingBottom: 20}}>
                                    <ProfilePortfolios/>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </Card>
                </div>
            </div>
        </CashflowContext.Provider>
    )
};
export default ProfilPage;