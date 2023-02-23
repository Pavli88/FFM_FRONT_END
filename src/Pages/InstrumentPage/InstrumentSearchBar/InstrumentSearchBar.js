// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from "react-bootstrap/Card";
import {Nav} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from 'react-select'
import {useState, useContext, useRef} from "react";

import InstrumentNew from "../InstrumentNew";
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";
const InstrumentSearchBar = () => {
    const saveRequestParameters = useContext(InstrumentSearchContext)['saveRequestParameters'];
    const nameRef = useRef();
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedCurrencies, setSelectedCurrencies] = useState([]);

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

    const fetchInstruments = () => {
        saveRequestParameters({
            name: nameRef.current.value,
            country: selectedCountries.map(data=>data.value),
            group: selectedGroup.value,
            type: selectedTypes.map(data=>data.value),
            currency: selectedCurrencies.map(data=>data.value)

        });
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
                            <Form.Control ref={nameRef} type="text"/>
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
                                onChange={(e) => setSelectedCountries(e)}
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
                                isClearable
                                onChange={(e) => e === null ? setSelectedGroup([]): setSelectedGroup(e)}
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
                                options={
                                selectedGroup.value === 'BND' ? bondType:
                                    selectedGroup.value === 'CSH' ? cashType:
                                        selectedGroup.value === 'CFD' ? cfdType: equityType}
                                onChange={(e) => setSelectedTypes(e)}
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
                                onChange={(e) => setSelectedCurrencies(e)}
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