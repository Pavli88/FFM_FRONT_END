import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Chart from "react-apexcharts";

const CardWidget = (props) => {

    return (
        <Card className="card" style={{margin:'0px'}}>
            <Card.Title className="card-header-first">{props.title}</Card.Title>
            <Card.Body style={{padding: '0px'}}>
                {props.children}
            </Card.Body>
        </Card>
    );
};

export default CardWidget