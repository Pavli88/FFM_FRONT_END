import {useContext, useEffect, useRef, useState} from "react";
import {ButtonGroupVertical} from "../../../components/Buttons/ButtonGroups";
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";
import fetchAPI from "../../../config files/api";
import InstrumentNewBrokerTicker from "./InstrumentNewBrokerTicker";

const InstrumentBrokerTickers = () => {
    const selectedInstrument = useContext(InstrumentSearchContext).selectedInstrument;
    const [showModal, setShowModal] = useState(false);
    const [tickers, setTickers] = useState([]);
    const [selectedTicker, setSelectedTicker] = useState();
    const isMounted = useRef(false);

    const tickerRows = tickers.map((data) => <tr key={data.id} onClick={()=>setSelectedTicker(data.id)}>
        <td>{data.source}</td>
        <td>{data.source_ticker}</td>
        <td>{data.margin}</td>
    </tr>)

    useEffect(() => {
        if (isMounted.current) {
            fetchAPI.get('instruments/get/broker/tickers/', {
                params: {
                    inst_code: selectedInstrument.id
                }
            })
                .then(data => setTickers(data.data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        } else {
            isMounted.current = true;
        }
        }, [selectedInstrument]
    );

    const deleteTicker = () => {
        fetchAPI.post('instruments/delete/broker/ticker/', {
            id: selectedTicker,
        })
            .then(response => alert(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    const buttonDict = {
        "New": () => setShowModal(!showModal),
        "Delete": () => deleteTicker()
    };

    return (
        <div style={{width: '100%', height: '100%'}}>
            <div className={'card'}>
                <div>
                    <ButtonGroupVertical buttonDict={buttonDict}/>
                </div>
                <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                    <table style={{width: '100%'}}>
                        <thead>
                        <tr>
                            <td>Broker</td>
                            <td>Ticker</td>
                            <td>Margin %</td>
                        </tr>
                        </thead>
                        <tbody style={{height: '100%', overflow: 'scroll'}}>
                        {tickerRows}
                        </tbody>
                    </table>
                </div>
                <InstrumentNewBrokerTicker
                    show={showModal}
                    close={() => setShowModal(!showModal)}/>
            </div>
        </div>
    )
};
export default InstrumentBrokerTickers;