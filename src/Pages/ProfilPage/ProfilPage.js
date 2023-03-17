// Bootstrap
import Container from "react-bootstrap/Container";

import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import BrokerAccounts from "./BrokerAccounts/BrokerAccounts";
import ProfilePortfolios from "./ProfilePortfolios/ProfilePortfolios";
import NewBrokerAccount from "./BrokerAccounts/NewBrokerAccount";
import PortfolioGroup from "./PortfolioGroup/PortfolioGroup";

import UserContext from "../../context/user-context";
import ServerContext from "../../context/server-context";
import { useContext } from "react";
import Button from "react-bootstrap/Button";

const ProfilPage = () => {
    const generalParameters = {
        user: useContext(UserContext).user,
        server: useContext(ServerContext).server
    };

    return(
        <Container
            style={{height: window.innerHeight, width: "100%", margin: '0px', padding: '0px'}}
            fluid>
            <Row style={{height: '20%'}}>

            </Row>
            <div style={{width: '100%', height: '80%'}}>
                <Tabs
                    defaultActiveKey="accounts"
                    id="profile-tab"
                    className="mb-3"
                >
                    <Tab eventKey="accounts" title="Broker Accounts">
                        <div style={{display: 'flex', width: '100%', height: '650px'}}>
                            <div style={{width: '300px', marginLeft: 20, marginRight: 10}}>
                                <NewBrokerAccount parameters={{...generalParameters}}/>
                            </div>
                            <div style={{width: '100%', marginLeft: 10, marginRight: 20}}>
                                <BrokerAccounts parameters={{...generalParameters}}/>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="portfolios" title="Portfolios">
                        <div style={{display: 'flex', width: '100%', height: '650px'}}>
                            <div style={{width: '300px', marginLeft: 20, marginRight: 10}}>
                                <PortfolioGroup/>
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
        </Container>
    )
};
export default ProfilPage;