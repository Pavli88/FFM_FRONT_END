import CardWithHeader from "../../../Widgets/Charts/CardWithHeader";
import { BsTrash } from "react-icons/bs";
import './TradeSignals.css'
import {useEffect, useState} from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";

const TradeSignals = (props) => {
    const [signalData, setSignalData] = useState([])
    const MINUTE_MS = 10000;

    useEffect(() => {
        fetchTradeMessages();
        const interval = setInterval(() => {
            fetchTradeMessages();
        }, MINUTE_MS);
        return () => clearInterval(interval);
    }, [])

    const fetchTradeMessages = async() => {
        const response = await axios.get(props.server + "trade_page/notifications/trade_signals/")
        const signals = response.data.map((data) => <tr key={data.id}>
                    <td className={'signal-row'}>
                        <div style={{width: '100%'}}>
                            <div className={'robot'}>
                                {data.portfolio_code}
                            </div>
                            <div className={'message'}>
                                {data.broker_name}
                            </div>
                            <div className={'message'}>
                                {data.message}
                            </div>
                            <div className={'sub-message'} style={{color: data.sub_message === 'Executed' ? 'green': data.sub_message === 'Close' ? "orchid": "red"}}>
                                {data.sub_message}
                            </div>
                        </div>
                        <div className={'time'}>
                            {data.created_on}
                        </div>
                    </td>
                </tr>)
        setSignalData(signals)
    };

    const deleteSignals = async() => {
        const response = await axios.get(props.server + "trade_page/delete/signals/")
        alert(response.data.response)
        fetchTradeMessages()
    };

    return(
        <Card style={{height: '100%'}}>
            <Card.Header style={{border: "none"}}>
                <div>
                    <div style={{display: 'flex', width: '100%'}}>
                        <div style={{width: '300px'}}>
                            Signals
                        </div>
                        <div style={{position: 'absolute', right: 10, margin: 0, padding: 0}}>
                            <button style={{padding: 0, width: 20}} className={'delete-button'} onClick={deleteSignals}><BsTrash/></button>
                        </div>
                    </div>
                </div>
            </Card.Header>

            <div style={{overflow: "scroll"}}>
                <table style={{width: '100%', height: '100%'}}>
                    <tbody style={{width: '100%'}}>

                    {signalData}

                    </tbody>
                </table>
            </div>

        </Card>
    )
};
export default TradeSignals;