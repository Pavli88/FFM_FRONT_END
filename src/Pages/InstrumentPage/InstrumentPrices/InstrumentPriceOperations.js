import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//CSS
import "./InstrumentPriceOperations.css"
import axios from "axios";

import NewInstrumentPriceModal from "./NewInstrumentPriceModal";

const InstrumentPriceOperations = (props) => {
    return(
        <Col>
            <Row>
                <NewInstrumentPriceModal server={props.server}/>
            </Row>
            <Row>
                <Button className={"operation-button"}>Edit</Button>
            </Row>
            <Row>
                <Button className={"operation-button"}>Delete</Button>
            </Row>
            <Row>
                <Button className={"operation-button"}>Import</Button>
            </Row>
        </Col>
    );
};
export default InstrumentPriceOperations;