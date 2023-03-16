// Bootstrap
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import BrokerAccounts from "./BrokerAccounts/BrokerAccounts";
import PortfolioGroup from "./PortfolioGroup/PortfolioGroup";
import ProfilePortfolios from "./ProfilePortfolios/ProfilePortfolios";

import UserContext from "../../context/user-context";
import ServerContext from "../../context/server-context";
import { useContext } from "react";

const ProfilPage = () => {
    const generalParameters = {
        user: useContext(UserContext).user,
        server: useContext(ServerContext).server
    };

    return(
        <Container
            style={{height: window.innerHeight, width: "100%", margin: '0px', padding: '0px'}}
            fluid>
            <Row style={{height: '90%'}}>
                <Col>

                </Col>
                <Col>
                    <Row style={{height:'30%'}}>
                        <BrokerAccounts parameters={{...generalParameters}} />
                    </Row>
                    <div style={{height:'70%', display: 'flex', paddingTop: 20}}>
                        {/*<div style={{width: '40%', paddingRight: 10}}>*/}
                        {/*    <PortfolioGroup/>*/}
                        {/*</div>*/}
                        <div style={{width: '100%'}}>
                            <ProfilePortfolios/>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
};
export default ProfilPage;