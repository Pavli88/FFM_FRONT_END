import NewBrokerAccount from "./NewBrokerAccount";
import BrokerAccounts from "./BrokerAccounts";
import {useContext} from "react";
import UserContext from "../../../context/user-context";
import ServerContext from "../../../context/server-context";

const BrokerAccountsPage = () => {
        const generalParameters = {
        user: useContext(UserContext).user,
        server: useContext(ServerContext).server
    };

    return (
        <div style={{display: 'flex', width: '100%', height: '800px'}}>
            {/*<div style={{width: '500px', margin: 10}}>*/}
            {/*    <NewBrokerAccount parameters={{...generalParameters}}/>*/}
            {/*</div>*/}
            <div style={{width: '100%', margin: 10}}>
                <BrokerAccounts parameters={{...generalParameters}}/>
            </div>
        </div>
    )
};

export default BrokerAccountsPage;