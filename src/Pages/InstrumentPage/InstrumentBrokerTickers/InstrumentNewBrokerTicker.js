import Modal from "react-bootstrap/Modal";
import {useContext, useRef, useState} from "react";
import fetchAPI from "../../../config files/api";
import BrokerContext from "../../../context/broker-context";
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";
import CustomModal from "../../../components/Modals/Modals";

const InstrumentNewBrokerTicker = ({show, close}) => {
    const selectedInstrument = useContext(InstrumentSearchContext).selectedInstrument;
    const {apiSupportedBrokers} = useContext(BrokerContext);

    const brokerRef = useRef();
    const tickerRef = useRef();
    const marginRef = useRef();

    // const [formData, setFormData] = useState({
    //     inst_code: null,
    //     source: null,
    //     source_ticker: null,
    //     margin: null,
    // });

    const submitHandler = (event) => {
        event.preventDefault();
        fetchAPI.post('instruments/new/ticker/', {
            inst_code: selectedInstrument.id,
            source: brokerRef.current.value,
            source_ticker: tickerRef.current.value,
            margin: marginRef.current.value,
        })
            .then(response => alert(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        close();
    };

    const brokers = apiSupportedBrokers.map((data) =>
        <option key={data.id} value={data.broker_code}>{data.broker}</option>
    )

    return (
        <CustomModal show={show} onClose={() => close()}
                     footer={<button variant="primary" onClick={submitHandler}>
                         Save
                     </button>}>

            <Modal.Title>New Broker Ticker - {selectedInstrument.id}</Modal.Title>

            <div>
                <label>Broker</label>
                <select ref={brokerRef}>
                    {brokers}
                </select>
            </div>

            <div>
                <label>Ticker</label>
                <input ref={tickerRef}></input>
            </div>

            <div>
                <label>Margin %</label>
                <input ref={marginRef} min={0.0} step={0.05} type={'number'}></input>
            </div>
        </CustomModal>
    )
};
export default InstrumentNewBrokerTicker;