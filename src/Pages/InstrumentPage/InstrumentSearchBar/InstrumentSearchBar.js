// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from "react-bootstrap/Card";
import {Nav} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from 'react-select'
import {useState} from "react";

const InstrumentSearchBar = () => {
    const [instrumentRequestParameters, setInstrumentRequestParameters] = useState({});
    const secGroup = [
        {value: 'CASH', label:'CASH'},
        {value: 'EQUITY', label: 'EQUITY'},
        {value: 'BOND', label: 'BOND'},
        {value: 'CURRENCY', label: 'CURRENCY'},
    ];

    const currencies = [
        {value: 1, label:'USD'},
        {value: 2, label: 'EUR'},
        {value: 3, label: 'HUF'}
    ];

    const countries = [
        {value: 1, label:'USA'},
        {value: 2, label: 'UK'},
        {value: 3, label: 'HU'}
    ];

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
                                Code
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
                        <Col md="auto">
                            <Select
                                isMulti
                                options={countries}
                                // value={selectedStrategies}
                                // isDisabled={isDisabled}
                                // onChange={(e) => setSelectedStrategies(e)}
                            />
                        </Col>
                        <Col md="auto" style={{paddingLeft: '5px'}}>
                            <Nav.Link disabled>
                                Group
                            </Nav.Link>
                        </Col>
                        <Col md="auto">
                            <Select
                                isMulti
                                options={secGroup}
                                // value={selectedStrategies}
                                // isDisabled={isDisabled}
                                // onChange={(e) => setSelectedStrategies(e)}
                            />
                        </Col>
                        <Col md="auto" style={{paddingLeft: '5px'}}>
                            <Nav.Link disabled>
                                Type
                            </Nav.Link>
                        </Col>
                        <Col md="auto">
                            <Select
                                isMulti
                                // options={robotStrategies}
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
                        <Col md="auto">
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
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};
export default InstrumentSearchBar;