import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {useContext, useState} from "react";
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";
import "./InstrumentResults.css"
import InstrumentPrices from "../InstrumentInfo/InstrumentPrices/InstrumentPrices";
import InstrumentBrokerTickers from "../InstrumentInfo/InstrumentBrokerTickers/InstrumentBrokerTickers";

const InstrumentResuts = (props) => {
    const saveSelectedInstrument = useContext(InstrumentSearchContext)['saveSelectedInstrument']
    const [showTickers, setShowTickers] = useState(false);
    const [showPrices, setShowPrices] = useState(false);
    const instruments = props.data.map((data) => <tr key={data['id']} onClick={() => saveSelectedInstrument(data)} className={'table-row-all'}>
        <td>{data['id']}</td>
        <td>{data['name']}</td>
        <td>{data['country']}</td>
        <td>{data['currency']}</td>
        <td>{data['group']}</td>
        <td>{data['type']}</td>
    </tr>)
    return (
        <div style={{display: 'flex', height: '100%'}}>
            <Card header={'Instruments'} style={{width: '100%', height: '100%'}}>
                <Card.Header>
                    <div style={{display: 'flex'}}>
                        <div>
                            Instruments
                        </div>

                        <div style={{display: "flex", position: "absolute", right: 15}}>
                            <div>
                                <button className={'get-button'}>Info</button>
                            </div>
                            <div style={{paddingLeft: 5}}>
                                <button className={'get-button'} onClick={() => setShowPrices(value => !value)}>Prices</button>
                            </div>
                            <div style={{paddingLeft: 5}}>
                                <button className={'get-button'} onClick={() => setShowTickers(value => !value)}>Tickers</button>
                            </div>
                        </div>
                    </div>
                </Card.Header>
                <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                    <Table style={{width: '100%'}}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Currency</th>
                            <th>Group</th>
                            <th>Type</th>
                        </tr>
                        </thead>
                        <tbody style={{height: '100%', overflow: 'scroll'}}>
                        {instruments}
                        </tbody>
                    </Table>
                </div>

            </Card>
            {showPrices ? <InstrumentPrices server={props.server} instrument={props.instrument}/>: <></>}
            {showTickers ? <InstrumentBrokerTickers server={props.server} id={props.instrument.id}/>: <></>}

        </div>

    )
};
export default InstrumentResuts;