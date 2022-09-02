import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


import {useRef} from "react";
import axios from "axios";

import InstrumentDelete from "./InstrumentDelete";

const InstrumentDetailsGeneral = (props) => {
    const nameRef = useRef();
    const instCodeRef = useRef();
    const currencyRef = useRef();
    const sourceCodeRef = useRef();
    const typeRef = useRef();

    const updateInstrument = () => {
        axios.post(props.server + 'instruments/update_instrument/', {
            id: props.data['id'],
            inst_code: instCodeRef.current.value,
            currency: currencyRef.current.value,
            instrument_name: nameRef.current.value,
            source_code: sourceCodeRef.current.value,
            instrument_type: typeRef.current.value,
        })
            .then(response => console.log(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    return (
        <div>
            <Form>
                <Form.Group as={Row} className="form-group">
                    <Col className={'search-parameter'} sm={4}>
                        <Form.Label>Name</Form.Label>
                    </Col>
                    <Col sm={8}>
                        <Form.Control ref={nameRef} size="sm" defaultValue={props.data['instrument_name']} key={props.data['instrument_name']} type="text"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                    <Col className={'search-parameter'} sm={4}>
                        <Form.Label>Instrument Code</Form.Label>
                    </Col>
                    <Col sm={8}>
                        <Form.Control ref={instCodeRef} size="sm" defaultValue={props.data['inst_code']} key={props.data['inst_code']} type="text"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                    <Col className={'search-parameter'} sm={4}>
                        <Form.Label>Currency</Form.Label>
                    </Col>
                    <Col sm={8}>
                        <Form.Control ref={currencyRef} size="sm"
                                       as={"select"}>
                            <option hidden>Please select a currency</option>
                            <option value={'USD'}>USD</option>
                            <option value={'EUR'}>EUR</option>
                            <option value={'HUF'}>HUF</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                    <Col className={'search-parameter'} sm={4}>
                        <Form.Label>Broker Ticker</Form.Label>
                    </Col>
                    <Col sm={8}>
                        <Form.Control ref={sourceCodeRef} size="sm" defaultValue={props.data['source_code']} key={props.data['source_code']} type="text"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                    <Col className={'search-parameter'} sm={4}>
                        <Form.Label>Instrument Type</Form.Label>
                    </Col>
                    <Col sm={8}>
                        <Form.Control ref={typeRef} size="sm"
                                      as={"select"}>
                            <option hidden>Please select an instrument type</option>
                            <option value={'Cash'}>Cash</option>
                            <option value={'Commodity'}>Commodity</option>
                            <option value={'CFD'}>CFD</option>
                            <option value={'Equity'}>Equity</option>
                            <option value={'Fixed Income'}>Fixed Income</option>
                            <option value={'Futures'}>Futures</option>
                            <option value={'Mutual Fund'}>Mutual Fund</option>
                            <option value={'Robot'}>Robot</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
            </Form>
            <Button onClick={updateInstrument}>Save</Button>
            <InstrumentDelete server={props.server} instrumentID={props.data['id']}/>
        </div>
    );
};
export default InstrumentDetailsGeneral;