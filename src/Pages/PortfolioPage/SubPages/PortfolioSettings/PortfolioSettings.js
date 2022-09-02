import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const PortfolioSettings = (props) => {
    return (
        <Container>
            <Row>
                <Card className="card">
                    <Card.Title className="card-header-first">Settings</Card.Title>
                    <p>set portfolio status - active or inactive</p>
                    <p>is robot trading allowed on the portfolio ?</p>
                </Card>
            </Row>
            <Row>
                <Card className="card">
                    <Card.Title className="card-header-first">Valuation</Card.Title>
                    <p>frequency</p>
                    <p>valuation day</p>
                </Card>
            </Row>
            <Row>
                <Card className="card">
                    <Card.Title className="card-header-first">Trade Routing</Card.Title>
                </Card>
            </Row>
        </Container>
    );
};

export default PortfolioSettings;