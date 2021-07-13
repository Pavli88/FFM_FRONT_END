import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "../MainCSS.css"

const PortfolioDetails = (props) => {

    return (
        <Card className="card">
            <Card.Title className="card-header-first">Portfolio Details</Card.Title>
            <Card.Body>
                <Form.Label>Name</Form.Label>
                <h2>hello</h2>
            </Card.Body>
        </Card>
    );
};

export default PortfolioDetails;