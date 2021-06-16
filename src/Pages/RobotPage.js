import {useState, useEffect, useContext} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import NewRobotForm from "../components/Forms/NewRobotForm";

import TableHeaderGenerator from "../components/Table";
import axios from "axios";

// Context
import ServerContext from "../context/server-context";
import EnvContext from "../context/env-context";

const RobotTableRow = (props) => {

    const env = useContext(EnvContext)['environment'];

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
    const server = useContext(ServerContext)['server'];

    const [robotData, setRobotData] = useState([])

    // Fetching robot risk data from database
    useEffect(() => {
            axios.get(server + 'robots/get_robots/')
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
            <NewRobotForm/>
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