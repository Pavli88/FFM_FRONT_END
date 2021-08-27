import SliderWidget from "../../components/SliderWidget";
import Button from "react-bootstrap/Button";
import axios from "axios";

import PriceParagraph from "./PriceParagraph";

const TradeTableRow = (props) => {

    // const newWebSocket = new WebSocket('ws://127.0.0.1:8000/trade/ws/')
    // newWebSocket.send('XAG_USD')

    // console.log("New trade", newWebSocket)

    const CloseTrade = () => {
        axios.post(props.server + 'trade_page/close_trade/', {
            broker_id: props.broker_id,
            robot: props.robot,
            trd_id: props.id,
        })
            .then(response => alert(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    return (
        <tr>
            <td style={{fontSize: 12, verticalAlign:"middle" }}>{props.id}</td>
            <td style={{fontSize: 12, verticalAlign:"middle" }}>{props.broker_id}</td>
            <td style={{fontSize: 12, verticalAlign:"middle"}}>{props.security}</td>
            <td style={{fontSize: 12, verticalAlign:"middle"}}>{props.robot}</td>
            <td style={{fontSize: 12, verticalAlign:"middle"}}>{props.quantity}</td>
            {/*<td><PriceParagraph socketConnection={newWebSocket}/></td>*/}
            <td><Button onClick={CloseTrade}>Close</Button></td>
        </tr>
    );
};

export default TradeTableRow;