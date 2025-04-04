import BrokerAccounts from "./BrokerAccounts";
import AccountContext from "../context/account-context";
import {useState} from "react";

const BrokerAccountsPage = () => {
    const [selectedAccount, setSelectedAccount] = useState(null);
    return (
        <AccountContext.Provider value={{
            selectedAccount: selectedAccount,
            saveSelectedAccount: setSelectedAccount
        }}>
            <div style={{display: 'flex', width: '100%', height: '800px'}}>
                <div style={{width: '100%', margin: 10}}>
                    <BrokerAccounts/>
                </div>
            </div>
        </AccountContext.Provider>
    )
};

export default BrokerAccountsPage;