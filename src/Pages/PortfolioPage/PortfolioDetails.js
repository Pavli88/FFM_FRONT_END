import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const PortfolioDetails = (props) => {

    const portSelectHandler = (event) => {
        props.portChange(event.target.value);
    };

    return (
        <Card style={{height: '200px'}}>
            <div style={{display: "flex", width: '50%'}}>
                <Card.Title>Portfolio Details</Card.Title>

            </div>
            <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Portfolio
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control onChange={portSelectHandler} as="select">{props.portOptions}</Form.Control>
                    </Col>
                </Form.Group>

        </Card>
    );
};

export default PortfolioDetails;