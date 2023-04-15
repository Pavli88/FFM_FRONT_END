import {useState, useEffect, useContext} from "react";
import {Route, Switch, Link} from "react-router-dom";
import ServerContext from "../../context/server-context";
import { RiskSidebarData } from "./RiskSidebarData";
import Sidebar from "../../components/Sidebar/Sidebar";
const RiskPage = () => {
    console.log(RiskSidebarData);
    const server = useContext(ServerContext)['server'];
    const [showImportModal, setShowImportModal] = useState(false);

    return (
        <div className={'page-container'}>
            <Sidebar sidebarData={RiskSidebarData} />
            <div style={{backgroundColor: 'blue', width: '100%', height: '100%'}}>
                <Switch>
                    <Route path="/risk/dashboard">
                        <h2>Risk Dashboard</h2>
                    </Route>
                    <Route path="/risk/transactions">
                        <h2>Transaction</h2>
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default RiskPage;