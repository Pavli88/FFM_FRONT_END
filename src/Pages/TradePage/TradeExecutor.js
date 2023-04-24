import {useContext, useState} from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import CardWithHeader from "../../Widgets/Charts/CardWithHeader";
import RobotContext from "../../context/robot-context";
import Button from "react-bootstrap/Button";

const TradeExecutor = (props) => {
    const allRobotsData = useContext(RobotContext)['allRobotsData'];
    const [selectedRobotId, setSelectedRobotId] = useState(allRobotsData[0]['id']);
    const [side, setSide] = useState('BUY');
    const [sl, setSl] = useState(0.0);
    const robots = allRobotsData.map((data) => <option key={data['id']} value={data['id']}>{data['name']}</option>)
    const submitHandler = (event) => {
        if (sl === 0.0) {
            alert('Stop loss cannot be zero!')
        } else {
            axios.post(props.server + 'trade_page/trade/new/', {
                robot_id: selectedRobotId,
                side: side,
                stop_level: sl,
            })
                .then(response => {
                    // saveLastTrade(lastTrade + 1);
                    alert(response['data'])
                })
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }
        ;
    };

    return (
        <div style={{width: '100%', paddingLeft: 15}}>
            <CardWithHeader headerContent={'Trades Execuion'}>
            <div style={{width: '100%', height:'100%'}}>
                <div style={{padding: '5px'}}>
                    <Form.Label>Robot</Form.Label>
                    <Form.Control onChange={(e) => setSelectedRobotId(e.target.value)} as="select">
                        {robots}
                    </Form.Control>
                </div>
                <div style={{padding: '5px'}}>
                    <Form.Label>Side</Form.Label>
                    <Form.Control onChange={(e) => setSide(e.target.value)} as="select">
                        <option value={'BUY'}>BUY</option>
                        <option value={'SELL'}>SELL</option>
                    </Form.Control>
                </div>
                <div style={{padding: '5px'}}>
                    <Form.Label>Stop Loss</Form.Label>
                    <Form.Control onChange={(e) => setSl(e.target.value)} type="number" min={0.0}/>
                </div>
            </div>
            <div style={{padding: '5px'}}>
                <Button variant="primary" onClick={submitHandler} style={{width: '100%'}}>
                    Execute
                </Button>
            </div>
        </CardWithHeader>
        </div>
    );
};

export default TradeExecutor