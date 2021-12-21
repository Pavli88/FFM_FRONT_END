import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const PortfolioDescription = () => {
    return (
        <Card className="card" style={{margin:'0px'}}>
            <Row>
                <Col>
                    <Card.Title className="card-header-first">Description</Card.Title>
                </Col>
                <Col>
                    <Button>Edit</Button>
                </Col>
            </Row>
            <Card.Body>
                <Row>
                    <Col>

                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default PortfolioDescription;