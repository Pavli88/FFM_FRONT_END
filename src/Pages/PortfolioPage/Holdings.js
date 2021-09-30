import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// CSS
import "../PortfolioPage.css"
import "../MainCSS.css"

const Holdings = () => {
    return (
        <Card className="card">
            <Card.Title className="card-header-first">Holdings</Card.Title>
            <Row style={{height: '100%'}}>
                <Col sm={8}>
                    <Container className="border" style={{width:'100%', height: '100%', padding:'5px'}} fluid>

                    </Container>
                </Col>
                <Col sm={4}>
                    <Container className="border" style={{width:'100%', height: '100%', padding:'5px'}} fluid>

                    </Container>
                </Col>
            </Row>
        </Card>
    );
};

export default Holdings;