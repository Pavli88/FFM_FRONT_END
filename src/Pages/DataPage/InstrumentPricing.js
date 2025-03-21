import Card from "react-bootstrap/Card";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import {useContext, useRef, useState} from "react";
import fetchAPI from "../../config files/api";

const InstrumentPricing = (props) => {
    const [vendorCode, setVendorCode] = useState('oanda');
    const startDateRef = useRef();
    const endDateRef = useRef();
    const vendor = [
        {value: 'oanda', label:'Oanda'},
    ];

    const runPricing = async() => {
        const response = await fetchAPI.post('instruments/pricing/', {
            'broker': vendorCode,
            'start_date': startDateRef.current.value,
            'end_date': endDateRef.current.value
            }
        )
        alert(response.data)
    };

    return(
        <div style={{paddingTop: 15}}>
             <Card >
            <Card.Header>
                Pricing
            </Card.Header>

             <div>
                Vendor
            </div>
            <div className={'instrument-search-input-field-container'}>
                <Select
                    isMulti
                    options={vendor}
                    // onChange={(e) => setSelectedCountries(e)}
                    className={'instrument-search-input-field'}
                />
            </div>

            <div>
                From
            </div>
            <div className={'instrument-search-input-field-container'}>
                <Form.Control ref={startDateRef} type="date" className={'instrument-search-input-field'}/>
            </div>

            <div>
                To
            </div>
            <div className={'instrument-search-input-field-container'}>
                <Form.Control ref={endDateRef} type="date" className={'instrument-search-input-field'}/>
            </div>

             <div style={{padding: 5}}>
                <button onClick={runPricing}>Run Pricing</button>
            </div>

        </Card>
        </div>
    )
};
export default InstrumentPricing;