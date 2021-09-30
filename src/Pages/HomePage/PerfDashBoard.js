import Card from 'react-bootstrap/Card';
import Table from "react-bootstrap/Table";
import {useEffect, useState} from "react";
import axios from "axios";
import './PerfDashBoard.css'

const PerformanceDashboard = (props) => {

    // Fetching Robot balance data
    const [perfData, setPerfData] = useState([]);

    useEffect(() => {
            axios.get(props.server + 'home/load_robot_stats/' + props.env)
                .then(response => response['data'])
                .then(data => setPerfData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    const perfRespData = perfData.map((record) =>
    <tr key={record['robot']['id']}>
        <td style={{fontSize: 12, verticalAlign:"middle"}} className="table-row-robot-name">{record['robot']['name']}</td>
        <td style={{fontSize: 12, verticalAlign:"middle"}} className="table-row-other">{record['balance']}</td>
        <td style={{fontSize: 12, verticalAlign:"middle"}} className="table-row-other">{record['dtd_ret']} %</td>
        <td style={{fontSize: 12, verticalAlign:"middle"}} className="table-row-other">{record['mtd_ret']} %</td>
        <td style={{fontSize: 12, verticalAlign:"middle"}} className="table-row-other">{record['ytd_ret']} %</td>
    </tr>);

    return (
        <Card className="card">
            <Card.Title className="card-header-first">Performance</Card.Title>
            <div style={{height:'500px',overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table size="sm">
                <thead>
                <tr>
                    <th className="table-row-robot-name">Robot</th>
                    <th>Balance</th>
                    <th>DTD</th>
                    <th>MTD</th>
                    <th>YTD</th>
                </tr>
                </thead>
                <tbody>
                {perfRespData}
                </tbody>
            </Table>
            </div>
        </Card>
    );

};

export default PerformanceDashboard;