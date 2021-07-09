import {useState} from "react";
import SliderWidget from "../../components/SliderWidget";
import Button from "react-bootstrap/Button";
import axios from "axios";


// CSS
import "../MainCSS.css"

const RiskTableRow = (props) => {

    const [robot, setRobot] = useState(props.robot);
    const [dailyRisk, setDailyRisk] = useState(props.dailyRisk);
    const [tradeLimit, setTradeLimit] = useState(props.tradeLimit);
    const [riskOnTrade, setRiskOnTrade] = useState(props.riskOnTrade);
    const [pLevel, setPLevel] = useState(props.pLevel);
    const [qType, setQType] = useState(props.qType);
    const [quantity, setQuantity] = useState(props.quantity);

    const UpdateRisk = () => {
        axios.post(props.server + 'risk/update_robot_risk/', {
            robot: robot,
            daily_risk: dailyRisk,
            nbm_trades: tradeLimit,
            risk_per_trade: riskOnTrade,
            pyramiding_level: pLevel,
            quantity_type: qType,
            quantity: quantity
        })
            .then(response => console.log(response))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        console.log(robot)
        console.log(tradeLimit)
        console.log(riskOnTrade)
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

    return (
        <tr>
            <td style={{verticalAlign: "middle"}}>{robot}</td>
            <td style={{verticalAlign: "middle"}} onChange={dailyRiskHandler}><SliderWidget defaultValue={dailyRisk}
                              min={0.00}
                              max={0.20}
                              step={0.005}/></td>
            <td style={{verticalAlign: "middle"}} className="table-row" onChange={tradeLimitHandler}><SliderWidget defaultValue={tradeLimit}
                              min={0}
                              max={20}
                              step={1}/></td>
            <td style={{verticalAlign: "middle"}} className="table-row" onChange={tradeRiskHandler}><SliderWidget defaultValue={riskOnTrade}
                              min={0.00}
                              max={0.1}
                              step={0.0025}/></td>
            <td style={{verticalAlign: "middle"}}>{pLevel}</td>
            <td style={{verticalAlign: "middle"}}>{qType}</td>
            <td style={{verticalAlign: "middle"}}>{quantity}</td>
            <td style={{verticalAlign: "middle"}}><Button onClick={UpdateRisk}>Update</Button></td>
        </tr>
    );
};

export default RiskTableRow;