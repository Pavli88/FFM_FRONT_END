import Button from "react-bootstrap/Button";
import {useContext, useState} from "react";
import RobotTransactionUpdateModal from "./RobotTransactionUpdateModal";
import RobotTransactionContext from "./RobotTransactionContext";

const RobotTransactionTableRow = (props) => {
    const saveModalData = useContext(RobotTransactionContext)['saveModalDataParameters'];
    const getTransactionData = (event) => {
        const rowData = event.target.parentElement.parentElement.children
        const rowList = []
        for (let i = 0; i < rowData.length; i++){
            rowList.push(rowData[i].innerHTML)
        }
        saveModalData({'data': rowList, 'status': true});
    };
    return (
        <>
            <tr>
                <td style={{fontSize: 14, verticalAlign: "middle"}}>{props.quantity}</td>
                <td style={{fontSize: 14, verticalAlign: "middle"}}>{props.status}</td>
                <td style={{fontSize: 14, verticalAlign: "middle", color: props.pnl < 0 ? '#E32227':'#007500'}}>{props.pnl}</td>
                <td style={{fontSize: 14, verticalAlign: "middle"}}>{props.open_price}</td>
                <td style={{fontSize: 14, verticalAlign: "middle"}}>{props.close_price}</td>
                <td style={{fontSize: 14, verticalAlign: "middle"}}>{props.open_time}</td>
                <td style={{fontSize: 14, verticalAlign: "middle"}}>{props.close_time}</td>
                <td style={{fontSize: 14, verticalAlign: "middle"}}>{props.side}</td>
                <td style={{fontSize: 14, verticalAlign: "middle"}}>{props.broker_id}</td>
                <td style={{fontSize: 14, verticalAlign: "middle"}}>{props.id}</td>
                <td><Button onClick={getTransactionData}>Update</Button></td>
            </tr>
        </>
    );
};
export default RobotTransactionTableRow