import {useState} from "react";
import Card from "react-bootstrap/Card";

const TradeExecutor = (props) => {
    const [robot, setRobot] = useState('');
    const [side, setSide] = useState()
    return (
        <Card style={{}} className="card">
            <Card.Title className="card-header-first">Robot Trade Execution</Card.Title>
            <div style={{height: '200px', width:'200px'}}>

            </div>
        </Card>
    );
};

export default TradeExecutor