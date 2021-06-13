import {useState, useEffect} from "react";

import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container'
import Form from "react-bootstrap/Form";
import Table from 'react-bootstrap/Table'

import RiskEntryModal from "../components/Modals";

const RiskTableRow = (props) => {

    const OpenUpdateRiskModal = () => {
        console.log("Button Clicked")
    };

    return (
        <tr>
            <td>{props.data['robot']}</td>
            <td>{props.data['daily_risk_perc']}</td>
            <td>{props.data['daily_trade_limit']}</td>
            <td>{props.data['risk_per_trade']}</td>
            <td>{props.data['pyramiding_level']}</td>
            <td>{props.data['quantity_type']}</td>
            <td>{props.data['quantity']}</td>
            <td><Button onClick={OpenUpdateRiskModal}>Update</Button></td>
        </tr>
    );
};

const RiskPage = () => {

    const [riskData, setRiskData] = useState([])

    // Fetching robot risk data from database
    useEffect(() => {
            fetch('http://127.0.0.1:8000/risk/get_robot_risk/')
                .then(response => response.json())
                .then(data => setRiskData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, []
    );

    console.log(riskData)

    const riskDataRow = riskData.map((data) =>
        <RiskTableRow key={data['id']} data={data}></RiskTableRow>);

    return (
        <div>
            <h2>Risk Page</h2>
            <RiskEntryModal></RiskEntryModal>
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Robot</th>
                            <th>Daily Loss Limit %</th>
                            <th>Max Number of Trades (Daily)</th>
                            <th>Risk per Trade %</th>
                            <th>Pyramiding Level</th>
                            <th>Quantity Type</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {riskDataRow}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default RiskPage;