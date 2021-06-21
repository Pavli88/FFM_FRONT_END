import {useState, useEffect, useContext} from "react";

import NewRobotForm from "../components/Forms/NewRobotForm";
import TableHeaderGenerator from "../components/Table";
import axios from "axios";

// Bootstrap
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';

// Context
import ServerContext from "../context/server-context";
import EnvContext from "../context/env-context";
import {Card} from "react-bootstrap";

import RiskEntryModal from "../components/Modals";

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


const RobotPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const env = useContext(EnvContext)['environment'];

    const [robotData, setRobotData] = useState([])

    // Fetching robot risk data from database
    useEffect(() => {
            axios.get(server + 'robots/get_robots/' + env)
                .then(response => response['data'].map((data) =>
                    <RobotTableRow key={data['id']} data={data}></RobotTableRow>))
                .then(data => setRobotData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    // Robot table header data
    const robotTableHeaderData = ['Name', 'Strategy', 'Security', 'Broker', 'Env', 'Status', 'Account Number', '']

    return (
        <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight, padding: '20px'}} fluid>
            <Card>
                <Card.Header as="h5">
                    <NewRobotForm server={server} style={{height: '400px'}}/>
                </Card.Header>
                <Table>
                    <TableHeaderGenerator list={robotTableHeaderData}/>
                    <tbody>
                    {robotData}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
};

export default RobotPage;