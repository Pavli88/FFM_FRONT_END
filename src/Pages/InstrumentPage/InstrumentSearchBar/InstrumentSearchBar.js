// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from "react-bootstrap/Card";
import {Nav} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from 'react-select'
import {useState} from "react";

import InstrumentNew from "../InstrumentNew";

const InstrumentSearchBar = () => {
    const [instrumentRequestParameters, setInstrumentRequestParameters] = useState({});
    const [secTypes, setSecTypes] = useState([]);
    const secGroup = [
        {value: 'BND', label: 'Bond'},
        {value: 'CSH', label:'Cash'},
        {value: 'CFD', label:'CFD'},
        {value: 'EQT', label: 'Equity'},
    ];

    const bondType = [
        {value:'CRP', label: 'Corporate'},
        {value:'GOV', label: 'Government'},
    ];

    const cashType = [
        {value:'CSH', label: 'Cash'},
    ];

    const cfdType = [
        {value:'BND', label: 'Bond'},
        {value:'COM', label: 'Commodity'},
        {value:'EQT', label: 'Equity'},
        {value:'FX', label: 'Fx'},
    ];

    const equityType = [
        {value:'EQT', label: 'Equity'},
    ];

    const currencies = [
        {value: 'USD', label:'USD'},
        {value: 'EUR', label: 'EUR'},
        {value: 'HUF', label: 'HUF'}
    ];

    const countries = [
        {value: 'US', label:'United States'},
        {value: 'UK', label: 'United Kingdom'},
        {value: 'HU', label: 'Hungary'}
    ];

    const secGroupHandler = (event) => {
        console.log(event.value)
        if (event.value === 'BND'){
            setSecTypes(bondType);
        }else if (event.value === 'CSH'){
            setSecTypes(cashType);
        }else if (event.value === 'CFD'){
            setSecTypes(cfdType);
        }else if (event.value === 'EQT'){
            setSecTypes(equityType);
        }
    };

    const fetchInstruments = () => {

    };

    return(
        <Card style={{paddingTop: '0px', margin: '0px'}}>
            <Row style={{height:'100%', padding:'5px'}}>
                <Col style={{padding: '0px', height: '100%'}}>
                    <Row style={{padding: '0px', height: '100%'}}>
                        <Col md="auto" style={{paddingLeft: '5px'}}>
                            <Nav.Link disabled>
                                Name
                            </Nav.Link>
                        </Col>
                        <Col md="auto">
                            <Form.Control type="text"/>
                        </Col>
                        <Col md="auto" style={{paddingLeft: '5px'}}>
                            <Nav.Link disabled>
                                Country
                            </Nav.Link>
                        </Col>
                        <Col md="auto" style={{width: 200}}>
                            <Select
                                isMulti
                                options={countries}
                                // value={selectedStrategies}
                                // isDisabled={isDisabled}
                                // onChange={(e) => secGroupHandler(e)}
                            />
                        </Col>
                        <Col md="auto" style={{paddingLeft: '5px'}}>
                            <Nav.Link disabled>
                                Group
                            </Nav.Link>
                        </Col>
                        <Col md="auto" style={{width: 150}}>
                            <Select
                                options={secGroup}
                                // value={selectedStrategies}
                                // isDisabled={isDisabled}
                                onChange={(e) => secGroupHandler(e)}
                            />
                        </Col>
                        <Col md="auto" style={{paddingLeft: '5px'}}>
                            <Nav.Link disabled>
                                Type
                            </Nav.Link>
                        </Col>
                        <Col md="auto" style={{width: 200}}>
                            <Select
                                isMulti
                                options={secTypes}
                                defaultValue={secTypes[0]}
                                // value={selectedStrategies}
                                // isDisabled={isDisabled}
                                // onChange={(e) => setSelectedStrategies(e)}
                            />
                        </Col>
                        <Col md="auto" style={{paddingLeft: '5px'}}>
                            <Nav.Link disabled>
                                Currency
                            </Nav.Link>
                        </Col>
                        <Col md="auto" style={{width: 200}}>
                            <Select
                                isMulti
                                options={currencies}
                                // value={selectedStrategies}
                                // isDisabled={isDisabled}
                                // onChange={(e) => setSelectedStrategies(e)}
                            />
                        </Col>
                        <Col>
                            <Button onClick={fetchInstruments}>Get</Button>
                        </Col>
                        <Col>
                            <InstrumentNew/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};
export default InstrumentSearchBar;