import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Select from 'react-select'
import {useState, useRef, useContext} from "react";

//Context
import ServerContext from "../../context/server-context";

const InstrumentNew = (props) => {
    const [showNewInstrumentModal, setShowNewInstrumentModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState('BND');
    const server = useContext(ServerContext)['server'];
    const nameRef = useRef();
    const tickerRef = useRef();
    const countryRef = useRef();
    const groupRef = useRef();
    const typeRef = useRef();
    const currencyRef = useRef();

    const handleClose = () => {
        setShowNewInstrumentModal(false);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(nameRef.current.value)
        console.log(countryRef.current.value)
        console.log(groupRef.current.value)
        console.log(typeRef.current.value)
        console.log(currencyRef.current.value)
        const code = groupRef.current.value === 'CSH' ? groupRef.current.value + typeRef.current.value +
            currencyRef.current.value : tickerRef.current.value.replace(' ', '').replace('/', '').toUpperCase() +
            groupRef.current.value + typeRef.current.value + currencyRef.current.value
        console.log(code)

        axios.post(server + 'instruments/new/', {
            name: nameRef.current.value,
            ticker: tickerRef.current.value,
            code: code,
            country: countryRef.current.value,
            group: groupRef.current.value,
            type: typeRef.current.value,
            currency: currencyRef.current.value,
        })
            .then(data => alert(data.data))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    const optionGenerator = (values) => {
        return values.map((data) => <option value={data.value}>{data.label}</option>)
    };

    const secGroup = [
        {value: 'BND', label: 'Bond'},
        {value: 'CSH', label:'Cash'},
        {value: 'CFD', label:'CFD'},
        {value: 'EQT', label: 'Equity'},
    ];

    const bondType = [
        {value:'COR', label: 'Corporate'},
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

    return (
        <div>
            <Button variant="primary" onClick={()=>setShowNewInstrumentModal(true)}>
                New Security
            </Button>
            <Modal show={showNewInstrumentModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Instrument</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler} style={{width: '100%'}}>
                        <Form.Group>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control ref={nameRef} type="text" required/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Ticker</Form.Label>
                            <Form.Control ref={tickerRef} type="text" required/>
                        </Form.Group>

                        <Form.Group className="form-group">
                            <Form.Label style={{textAlign: 'left'}}>Country of Issue</Form.Label>
                            <Form.Control ref={countryRef} as={'select'}>
                                {optionGenerator(countries)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="form-group">
                            <Form.Label style={{textAlign: 'left'}}>Group</Form.Label>
                             <Form.Control ref={groupRef} onChange={(e) => setSelectedGroup(e.target.value)} as={'select'}>
                                 {optionGenerator(secGroup)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="form-group">
                            <Form.Label style={{textAlign: 'left'}}>Type</Form.Label>
                            <Form.Control ref={typeRef} as={'select'}>
                                {selectedGroup === 'BND' ? optionGenerator(bondType) :
                                    selectedGroup === 'CSH' ? optionGenerator(cashType) :
                                        selectedGroup === 'CFD' ? optionGenerator(cfdType) :
                                            optionGenerator(equityType)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Currency</Form.Label>
                            <Form.Control ref={currencyRef} type="text" required as={"select"}>
                                {optionGenerator(currencies)}
                            </Form.Control>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitHandler}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default InstrumentNew;