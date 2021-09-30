import {useState} from "react";
import SliderWidget from "../../components/SliderWidget";
import Button from "react-bootstrap/Button";
import axios from "axios";


// CSS
import "../MainCSS.css"
import Form from "react-bootstrap/Form";

const RiskTableRow = (props) => {

    const [robot, setRobot] = useState(props.robot);
    const [dailyRisk, setDailyRisk] = useState(props.dailyRisk);
    const [tradeLimit, setTradeLimit] = useState(props.tradeLimit);
    const [riskOnTrade, setRiskOnTrade] = useState(props.riskOnTrade);
    const [pLevel, setPLevel] = useState(props.pLevel);
    const [qType, setQType] = useState(props.qType);
    const [quantity, setQuantity] = useState(props.quantity);
    const [sl, setSl] = useState(props.sl);
    const [winExp, setWinExp] = useState(props.winExp);

    const UpdateRisk = () => {
        axios.post(props.server + 'risk/update_robot_risk/', {
            robot: robot,
            daily_risk: dailyRisk,
            nbm_trades: tradeLimit,
            risk_per_trade: riskOnTrade,
            pyramiding_level: pLevel,
            quantity_type: qType,
            quantity: quantity,
            sl: sl,
            win_exp: winExp
        })
            .then(response => alert('Risk is updated for ' + robot))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    const tradeLimitHandler = (event) => {
        setTradeLimit(event.target.value)
    };

    const tradeRiskHandler = (event) => {
        setRiskOnTrade(event.target.value)
    };

    const dailyRiskHandler = (event) => {
        setDailyRisk(event.target.value)
    };

    const quantityTypeHandler = (event) => {
        setQType(event.target.value)
    };

    const quantityHandler = (event) => {
        setQuantity(event.target.value)
    };

    const slHandler = (event) => {
        setSl(event.target.value)
    };

    const winExpHandler = (event) => {
        setWinExp(event.target.value)
    };

    return (
        <tr>
            <td style={{verticalAlign: "middle"}}>{robot}</td>
            <td style={{verticalAlign: "middle"}}>
                <Form.Control onChange={dailyRiskHandler} type="number" placeholder={dailyRisk}/>
            </td>
            <td style={{verticalAlign: "middle"}}>
                <Form.Control onChange={tradeLimitHandler} type="number" placeholder={tradeLimit}/>
            </td>
            <td style={{verticalAlign: "middle"}}>
                <Form.Control onChange={tradeRiskHandler} type="number" placeholder={riskOnTrade}/>
            </td>
            <td style={{verticalAlign: "middle"}}>
                <Form.Control onChange={quantityTypeHandler} defaultValue={qType} as="select">
                    <option value={'Stop Based'}>Stop Based</option>
                    <option value={'Fix'}>Fix</option>
                </Form.Control>
            </td>
            <td style={{verticalAlign: "middle"}}>
                <Form.Control onChange={quantityHandler} type="number" placeholder={quantity}/>
            </td>
            <td style={{verticalAlign: "middle"}}>
                <Form.Control onChange={slHandler} type="number" placeholder={sl}/>
            </td>
            <td style={{verticalAlign: "middle"}}>
                <Form.Control onChange={winExpHandler} type="number" placeholder={winExp}/>
            </td>
            <td style={{verticalAlign: "middle"}}><Button onClick={UpdateRisk}>Update</Button></td>
        </tr>
    );
};

export default RiskTableRow;