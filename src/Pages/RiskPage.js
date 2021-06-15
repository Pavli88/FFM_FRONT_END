import {useState, useEffect} from "react";

import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container'
import Form from "react-bootstrap/Form";
import Table from 'react-bootstrap/Table'

import RiskEntryModal from "../components/Modals";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";

const RiskTableData = (props) => {
    const [riskData, setRiskData] = useState([])

    // Fetching robot risk data from database
    useEffect(() => {
            fetch('http://127.0.0.1:8000/risk/get_robot_risk/' + props.env)
                .then(response => response.json())
                .then(data => setRiskData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    const OpenModal = () => {

    };

    const riskDataRow = riskData.map((data) =>
        <tr key={data['id']}>
            <td>{data['robot']}</td>
            <td>{data['daily_risk']}</td>
            <td>{data['daily_trade_limit']}</td>
            <td>{data['risk_per_trade']}</td>
            <td>{data['pyramiding_level']}</td>
            <td>{data['quantity_type']}</td>
            <td>{data['quantity']}</td>
            <td><Button onClick={OpenModal}>Update</Button></td>
        </tr>
    );

    return (
        <tbody>
        {riskDataRow}
        </tbody>
    );
};

const RiskPage = () => {

    const [robotEnvData, setRobotEnvData] = useState('live')

    const envChange = (envValue) => {
        setRobotEnvData(envValue);
    };

    return (
        <div>
            <h2>Risk Page</h2>
            <Row>
                <h2>{robotEnvData}</h2>
                <Dropdown onSelect={envChange}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Environment
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="live">Live</Dropdown.Item>
                        <Dropdown.Item eventKey="demo">Demo</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Row>
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
                    <RiskTableData env={robotEnvData}/>
                </Table>
            </div>
        </div>
    );
};

export default RiskPage;