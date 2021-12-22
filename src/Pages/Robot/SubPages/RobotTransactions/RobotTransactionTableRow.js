import Button from "react-bootstrap/Button";

const RobotTransactionTableRow = (props) => {
    return (<tr>
        <td style={{fontSize: 12, verticalAlign: "middle"}}>{props.quantity}</td>
        <td style={{fontSize: 12, verticalAlign: "middle"}}>{props.status}</td>
        <td style={{fontSize: 12, verticalAlign: "middle"}}>{props.pnl}</td>
        <td style={{fontSize: 12, verticalAlign: "middle"}}>{props.open_price}</td>
        <td style={{fontSize: 12, verticalAlign: "middle"}}>{props.close_price}</td>
        <td style={{fontSize: 12, verticalAlign: "middle"}}>{props.open_time}</td>
        <td style={{fontSize: 12, verticalAlign: "middle"}}>{props.close_time}</td>
        <td style={{fontSize: 12, verticalAlign: "middle"}}>{props.side}</td>
        <td style={{fontSize: 12, verticalAlign: "middle"}}>{props.broker_id}</td>
        <td><Button>Update</Button></td>
    </tr>);
};

export default RobotTransactionTableRow