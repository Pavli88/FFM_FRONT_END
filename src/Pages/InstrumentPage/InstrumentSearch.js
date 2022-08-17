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

import InstrumentNew from "./InstrumentNew";
import NewPortfolioForm from "../PortfolioPage/NewPortfolioForm";

const InstrumentSearch = (props) => {
    const setResponseData = useContext(InstrumentSearchContext)['saveInstrumentSearchResults']
    const [instrumentName, setInstrumentName] = useState();
    const [instrumentType, setInstrumentType] = useState();
    const [currency, setCurrency] = useState();
    const [code, setCode] = useState();
    const [source, setSource] = useState();

    const searchInstrument = () => {
        axios.get(props.server + 'instruments/get_instruments/', {
            params: {
                instrument_name: instrumentName,
                currency: currency,
                code: code,
                source: source,
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
                            <option>Please select a security type</option>
                            <option value={'Commodity'}>Commodity</option>
                            <option value={'Equity'}>Equity</option>
                            <option value={'Equity CFD'}>Equity CFD</option>
                            <option value={'Futures'}>Futures</option>
                            <option value={'Futures CFD'}>Futures CFD</option>
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
                            <option>Please select a currency</option>
                            <option value={'USD'}>USD</option>
                            <option value={'EUR'}>EUR</option>
                            <option value={'HUF'}>HUF</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                    <Col className={'search-parameter'} sm={4}>
                        <Form.Label >Source</Form.Label>
                    </Col>
                    <Col sm={8}>
                        <Form.Control onChange={(e) => setSource(e.target.value)} size="sm" as={'select'}>
                            <option>Please select a source</option>
                            <option value={'ffm_system'}>System</option>
                            <option value={'oanda'}>Oanda</option>
                            <option value={'MAP'}>Magyar Államkincstár</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
            </Form>
            <Button onClick={searchInstrument} variant="primary" type="submit">Search</Button>
            <InstrumentNew server={props.server}/>
        </Card>
    );
};
export default InstrumentSearch;