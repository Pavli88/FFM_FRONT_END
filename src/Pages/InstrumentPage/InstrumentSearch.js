import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from 'react-bootstrap/Form'

//CSS
import "./InstrumentSearch.css"
import axios from "axios";
import {useState, useContext} from "react";

//Context
import InstrumentSearchContext from "./InstrumentPageContext/instrument-search-context";
import BrokerContext from "../../context/broker-context";

import InstrumentNew from "./InstrumentNew";

const InstrumentSearch = (props) => {
    const setResponseData = useContext(InstrumentSearchContext)['saveInstrumentSearchResults']
    const brokerData = useContext(BrokerContext)['brokerData']
    const [instrumentName, setInstrumentName] = useState();
    const [instrumentType, setInstrumentType] = useState();
    const [currency, setCurrency] = useState();
    const [code, setCode] = useState();
    const [source, setSource] = useState();
    const brokers = brokerData.map((data) => <option value={data['broker_code']} key={data['id']}>{data['broker']}</option>)
    const searchInstrument = () => {
        axios.get(props.server + 'instruments/get_instruments/', {
            params: {
                instrument_name: instrumentName,
                currency: currency,
                code: code,
                instrument_type: instrumentType,
            }
        })
            .then(response => setResponseData(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    return (
        <Card className="card main-layout">
            <Card.Title className="card-header-first">Search</Card.Title>
            <Form>
                <Form.Group as={Row} className="form-group">
                    <Col className={'search-parameter'} sm={4}>
                        <Form.Label>Name</Form.Label>
                    </Col>
                    <Col sm={8}>
                        <Form.Control onChange={(e)=>setInstrumentName(e.target.value)} size="sm" type="text"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                    <Col className={'search-parameter'} sm={4}>
                        <Form.Label>Code</Form.Label>
                    </Col>
                    <Col sm={8}>
                        <Form.Control onChange={(e)=>setCode(e.target.value)} size="sm" type="text"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                    <Col className={'search-parameter'} sm={4}>
                        <Form.Label style={{textAlign: 'left'}}>Type</Form.Label>
                    </Col>
                    <Col sm={8}>
                        <Form.Control onChange={(e) => setInstrumentType(e.target.value)} size="sm" as={'select'}>
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
                <Form.Group as={Row} className="form-group">
                    <Col className={'search-parameter'} sm={4}>
                        <Form.Label style={{textAlign: 'left'}}>Currency</Form.Label>
                    </Col>
                    <Col sm={8}>
                        <Form.Control onChange={(e) => setCurrency(e.target.value)} size="sm" as={'select'}>
                            <option value={'USD'}>USD</option>
                            <option value={'EUR'}>EUR</option>
                            <option value={'HUF'}>HUF</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
            </Form>
            <Row>
                <Col>
                    <Button onClick={searchInstrument} variant="primary" type="submit">Search</Button>
                </Col>
                <Col>
                    <InstrumentNew server={props.server}/>
                </Col>
            </Row>
        </Card>
    );
};
export default InstrumentSearch;