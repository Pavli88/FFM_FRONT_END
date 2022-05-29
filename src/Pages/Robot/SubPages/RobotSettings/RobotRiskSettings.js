import CardWidget from "../../../../components/CardWidget";

import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import axios from "axios";

const RobotRiskSettings = (props) => {
    const [dailyRiskPerc, setDailyRiskPerc] = useState();
    const [dailyTradeLimit, setDailyTradeLimit] = useState();
    const [riskPerTrade, setRiskPerTrade] = useState();
    const [quantityType, setQuantityType] = useState();
    const [quantity, setQuantity] = useState();
    const [sl, setSl] = useState();
    const [winExp, setWinExp] = useState();
    // Fetching robot risk data from database
    useEffect(() => {
            fetch(props.server + 'risk/get_risk/' + props.robot)
                .then(response => response.json())
                .then(function(data){
                    setDailyRiskPerc(data['daily_risk_perc']);
                    setDailyTradeLimit(data['daily_trade_limit']);
                    setRiskPerTrade(data['risk_per_trade']);
                    setQuantityType(data['quantity_type']);
                    setQuantity(data['quantity']);
                    setSl(data['sl']);
                    setWinExp(data['win_exp']);
                })
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );
    const submitForm = (event) => {
        event.preventDefault();
        axios.post(props.server + 'risk/update_robot_risk/', {
            robot: props.robot,
            daily_risk: dailyRiskPerc,
            nbm_trades: dailyTradeLimit,
            risk_per_trade: riskPerTrade,
            pyramiding_level: 1,
            quantity_type: quantityType,
            quantity: quantity,
            sl: sl,
            win_exp: winExp,
        })
            .then(response => alert('Risk is updated for ' + props.robot))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    return (
        <CardWidget title={"Risk Settings"}>
            <Form>
                <Form.Group className="mb-3" controlId="daily_risk_perc">
                    <Form.Label>Daily Loss Limit</Form.Label>
                    <Form.Control onChange={(e) => setDailyRiskPerc(e.target.value)} type="number" value={dailyRiskPerc}
                                  min={0.0} max={1}
                                  step={0.01}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="daily_trade_limit">
                    <Form.Label>Max Number of Trades per Day</Form.Label>
                    <Form.Control onChange={(e) => setDailyTradeLimit(e.target.value)} type="number" value={dailyTradeLimit} min={0.0}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="risk_per_trade">
                    <Form.Label>Risk Exposure per Trade</Form.Label>
                    <Form.Control onChange={(e) => setRiskPerTrade(e.target.value)} type="number" value={riskPerTrade} min={0.0} step={0.005}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="quantity_type">
                    <Form.Label>Quantity Type</Form.Label>
                    <Form.Control onChange={(e) => setQuantityType(e.target.value)} value={quantityType} as="select">
                        <option value={'Stop Based'}>Stop Based</option>
                        <option value={'Fix'}>Fix</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control onChange={(e) => setQuantity(e.target.value)} type="number" placeholder={quantity} min={0.0}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="sl">
                    <Form.Label>Stop Loss</Form.Label>
                    <Form.Control onChange={(e) => setSl(e.target.value)} type="number" placeholder={sl} min={0.0}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="win_exp">
                    <Form.Label>Winning Exposure per Trade</Form.Label>
                    <Form.Control onChange={(e) => setWinExp(e.target.value)} type="number" placeholder={winExp} min={0.0}/>
                </Form.Group>
                <Button onClick={submitForm} variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </CardWidget>
    );
};

export default RobotRiskSettings;
