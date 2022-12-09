import {useContext, useState} from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import axios from "axios";

// Context
import RobotContext from "../../context/robot-context";
import Button from "react-bootstrap/Button";
import TradeContext from "./TradePageContext/TradePageContext";

const TradeExecutor = (props) => {
    const lastTrade = useContext(TradeContext)['lastTrade'];
    const saveLastTrade = useContext(TradeContext)['saveLastTrade'];
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
                    saveLastTrade(lastTrade + 1);
                    alert(response['data'])
                })
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }
        ;
    };

    return (
        <Card style={{}} className="card">
            <Card.Title className="card-header-first">Trade Execution</Card.Title>
            <Form onSubmit={submitHandler} style={{width: '100%'}}>
                <Form.Group>
                    <Form.Label>Robot</Form.Label>
                    <Form.Control onChange={(e) => setSelectedRobotId(e.target.value)} as="select">
                        {robots}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Side</Form.Label>
                    <Form.Control onChange={(e) => setSide(e.target.value)} as="select">
                        <option value={'BUY'}>BUY</option>
                        <option value={'SELL'}>SELL</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Stop Loss</Form.Label>
                    <Form.Control onChange={(e) => setSl(e.target.value)} type="number" min={0.0}/>
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={submitHandler}>
                Execute
            </Button>
        </Card>
    );
};

export default TradeExecutor