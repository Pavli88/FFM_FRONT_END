import {useState, useEffect} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import TableHeaderGenerator from "../components/Table";

const RobotTableRow = (props) => {

    const OpenUpdateRiskModal = () => {
        console.log("Button Clicked")
    };

    return (
        <tr>
            <td>{props.data['name']}</td>
            <td>{props.data['strategy']}</td>
            <td>{props.data['security']}</td>
            <td>{props.data['broker']}</td>
            <td>{props.data['env']}</td>
            <td>{props.data['status']}</td>
            <td>{props.data['account_number']}</td>
            <td><Button onClick={OpenUpdateRiskModal}>Update</Button></td>
        </tr>
    );
};


const RobotPage = () => {

    const [robotData, setRobotData] = useState([])

    // Fetching robot risk data from database
    useEffect(() => {
            fetch('http://127.0.0.1:8000/robots/get_robots/')
                .then(response => response.json())
                .then(data => setRobotData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, []
    );

    // Robot table header data
    const robotTableHeaderData = ['Name', 'Strategy', 'Security', 'Broker', 'Env', 'Status', 'Account Number', '']
    const robotDataRow = robotData.map((data) =>
        <RobotTableRow key={data['id']} data={data}></RobotTableRow>);

    return (

        <div>
            <h2>Robot Page</h2>
            <Table>
                <TableHeaderGenerator list={robotTableHeaderData}/>
                <tbody>
                    {robotDataRow}
                </tbody>
            </Table>
        </div>
    );
};

export default RobotPage;