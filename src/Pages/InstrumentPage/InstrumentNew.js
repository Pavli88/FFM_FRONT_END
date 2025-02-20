import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
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
    const countryRef = useRef();
    const groupRef = useRef();
    const typeRef = useRef();
    const currencyRef = useRef();

    const handleClose = () => {
        setShowNewInstrumentModal(false);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(server + 'instruments/new/', {
            name: nameRef.current.value,
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
        {value: 'Bond', label: 'Bond'},
        {value: 'Cash', label:'Cash'},
        {value: 'CFD', label:'CFD'},
        {value: 'Equity', label: 'Equity'},
        {value: 'Loan', label: 'Loan'},
        {value: 'Option', label: 'Option'},
    ];

    const bondType = [
        {value:'COR', label: 'Corporate'},
        {value:'GOV', label: 'Government'},
    ];

    const cashType = [
        {value:'Cash', label: 'Cash'},
        {value:'Margin', label: 'Margin'},
    ];

    const cfdType = [
        {value:'Bond', label: 'Bond'},
        {value:'COM', label: 'Commodity'},
        {value:'Equity', label: 'Equity'},
        {value:'FX', label: 'Fx'},
    ];

    const equityType = [
        {value:'Equity', label: 'Equity'},
        {value:'Fund', label: 'Fund'},
    ];

    const optionType = [
        {value:'Equity', label: 'Equity'},
        {value:'FX', label: 'FX'},
        {value:'Index', label: 'Index'},
    ];

    const loanType = [
        {value:'Leverage', label: 'Leverage'},
    ];

    const currencies = [
        {value: 'USD', label: 'USD'},
        {value: 'EUR', label: 'EUR'},
        {value: 'HUF', label: 'HUF'},
        {value: 'AUD', label: 'AUD'},
        {value: 'NZD', label: 'NZD'},
        {value: 'JPY', label: 'JPY'},
        {value: 'HKD', label: 'HKD'},
        {value: 'DKK', label: 'DKK'},
        {value: 'SEK', label: 'SEK'},
        {value: 'NOK', label: 'NOK'},
        {value: 'CHF', label: 'CHF'},
        {value: 'CAD', label: 'CAD'},
        {value: 'GBP', label: 'GBP'},
        {value: 'CZK', label: 'CZK'},
        {value: 'PLN', label: 'PLN'},
        {value: 'SGD', label: 'SGD'},
    ];

    const countries = [
        {value: 'US', label: 'United States'},
        {value: 'UK', label: 'United Kingdom'},
        {value: 'HU', label: 'Hungary'},
        {value: 'NON', label: '-'},
    ];

    return (
        <div>
            <button onClick={()=>setShowNewInstrumentModal(true)} style={{width: '100%'}}>
                New Instrument
            </button>
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
                                {selectedGroup === 'Bond' ? optionGenerator(bondType) :
                                    selectedGroup === 'Cash' ? optionGenerator(cashType) :
                                        selectedGroup === 'CFD' ? optionGenerator(cfdType) :
                                            selectedGroup === 'Loan' ? optionGenerator(loanType):
                                                selectedGroup === 'Option' ? optionGenerator(optionType):
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
                    <button onClick={handleClose}>
                        Close
                    </button>
                    <button onClick={submitHandler}>
                        Save
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default InstrumentNew;