// Bootstrap
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const ProfilPage = () => {
    return(
        <Container
            style={{height: window.innerHeight, width: "100%", margin: '0px', padding: '0px'}}
            fluid>
            <Row>
                <Col>
                    <h2>General</h2>
                </Col>
                <Col>
                    Broker Accounts
                </Col>
                <Col>
                    Portfolios and Groups
                </Col>
            </Row>
        </Container>
    )
};
export default ProfilPage;