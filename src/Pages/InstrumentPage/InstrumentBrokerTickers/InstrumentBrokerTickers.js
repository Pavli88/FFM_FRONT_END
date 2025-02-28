import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import ServerContext from "../../../context/server-context";
import {ButtonGroupVertical} from "../../../components/Buttons/ButtonGroups";
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";

const InstrumentBrokerTickers = () => {
    const server = useContext(ServerContext).server;
    const selectedInstrument = useContext(InstrumentSearchContext).selectedInstrument;
    const [showNewTickerModal, c] = useState(false);
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
            axios.get(`${server}instruments/get/broker/tickers/`, {
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
        axios.post(`${server}instruments/delete/broker/ticker/`, {
            id: selectedTicker,
        })
            .then(response => alert(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    const buttonDict = {
        "New": () => selectedInstrument(!showNewTickerModal),
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
                {/*<InstrumentNewBrokerTicker id={id}*/}
                {/*                           server={server}*/}
                {/*                           show={showNewTickerModal}*/}
                {/*                           hide={() => setShowNewTickerModal(false)}/>*/}
            </div>
        </div>
    )
};
export default InstrumentBrokerTickers;