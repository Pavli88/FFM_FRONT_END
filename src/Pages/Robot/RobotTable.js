import {useEffect, useState} from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const RobotTable = (props) => {

    const [robotData, setRobotData] = useState([])

    const OpenUpdateRiskModal = () => {
        console.log("Button Clicked")
    };

    // Fetching robot risk data from database
    useEffect(() => {
            axios.get(props.server + 'robots/get_robots/' + props.env)
                .then(response => response['data'].map((data) =>
                    <tr key={data['id']}>
                        <td>{data['name']}</td>
                        <td>{data['strategy']}</td>
                        <td>{data['security']}</td>
                        <td>{data['broker']}</td>
                        <td>{data['env']}</td>
                        <td>{data['status']}</td>
                        <td>{data['account_number']}</td>
                        <td><Button onClick={OpenUpdateRiskModal}>Update</Button></td>
                    </tr>
                ))
                .then(data => setRobotData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    return (
        <Table>
            <thead>
            <tr>
                <td>Name</td>
                <td>Strategy</td>
                <td>Security</td>
                <td>Broker</td>
                <td>Env</td>
                <td>Status</td>
                <td>Account Number</td>
            </tr>
            </thead>
            <tbody>
            {robotData}
            </tbody>
        </Table>
    );
};

export default RobotTable;