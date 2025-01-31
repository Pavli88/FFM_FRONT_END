import BrokerAccounts from "./BrokerAccounts/BrokerAccounts";
import ProfilePortfolios from "./ProfilePortfolios/ProfilePortfolios";
import NewBrokerAccount from "./BrokerAccounts/NewBrokerAccount";
import PortfolioGroup from "./PortfolioGroup/PortfolioGroup";
import UserContext from "../../context/user-context";
import ServerContext from "../../context/server-context";
import CashflowContext from "./context/cashflow-context";
import Tabs from "../../components/Tabs/Tabs";
import {useContext, useEffect, useState} from "react";


const ProfilPage = () => {
    const [newCashflow, setNewCashflow] = useState(0);

    const generalParameters = {
        user: useContext(UserContext).user,
        server: useContext(ServerContext).server
    };

    const tabs = [
        {
            id: 1, label: "Broker Accounts", content: <div style={{display: 'flex', width: '100%', height: '800px'}}>
                <div style={{width: '500px', margin: 10}}>
                    <NewBrokerAccount parameters={{...generalParameters}}/>
                </div>
                <div style={{width: '100%', margin: 10}}>
                    <BrokerAccounts parameters={{...generalParameters}}/>
                </div>
            </div>
        },
        {
            id: 2, label: "Portfolios", content: <div style={{display: 'flex', width: '100%', height: '800px'}}>
                <div style={{width: '40%', height: '100%', margin: 10}}>
                    <PortfolioGroup/>
                </div>
                <div style={{width: '60%', height: '100%', margin: 10}}>
                    <ProfilePortfolios/>
                </div>
            </div>
        },
    ];



    return (
        <CashflowContext.Provider value={{
            cashFlowNumber: newCashflow,
            saveNewCashflow: setNewCashflow,
        }}>
            <div className={'page-container'}>
                <p>Test</p>
                <div style={{width: '100%', height: '100%', padding: 20}}>
                    <Tabs tabs={tabs}/>
                </div>
            </div>
        </CashflowContext.Provider>
    )
};
export default ProfilPage;