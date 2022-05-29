import Card from 'react-bootstrap/Card';
import Table from "react-bootstrap/Table";
import {useEffect, useState} from "react";
import axios from "axios";
import './PerfDashBoard.css'
import Row from "react-bootstrap/Row";

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
        <td style={{fontSize: 14, verticalAlign:"middle"}} className="table-row-robot-name">{record['robot']['name']}</td>
        <td style={{fontSize: 14, verticalAlign:"middle", color: record['balance']<0.0 ? 'red': 'green'}} className="table-row-other">{record['balance']}</td>
        <td style={{fontSize: 14, verticalAlign:"middle", color: record['dtd_ret']<0.0 ? 'red': 'green'}} className="table-row-other">{record['dtd_ret']} %</td>
        <td style={{fontSize: 14, verticalAlign:"middle", color: record['mtd_ret']<0.0 ? 'red': 'green'}} className="table-row-other">{record['mtd_ret']} %</td>
        <td style={{fontSize: 14, verticalAlign:"middle", color: record['ytd_ret']<0.0 ? 'red': 'green'}} className="table-row-other">{record['ytd_ret']} %</td>
    </tr>);

    return (
        <Row style={{height: '450px', width: '100%', margin: '15px'}}>
            <Card className="card" style={{margin: '0px'}}>
                <div style={{height: '500px', overflowY: 'scroll', overflowX: 'hidden'}}>
                    <Table>
                        <thead>
                        <tr>
                            <th style={{fontSize: 14, verticalAlign: "middle"}} className="table-row-robot-name">Robot
                            </th>
                            <th style={{fontSize: 14, verticalAlign: "middle"}}>Balance</th>
                            <th style={{fontSize: 14, verticalAlign: "middle"}}>DTD</th>
                            <th style={{fontSize: 14, verticalAlign: "middle"}}>MTD</th>
                            <th style={{fontSize: 14, verticalAlign: "middle"}}>YTD</th>
                        </tr>
                        </thead>
                        <tbody>
                        {perfRespData}
                        </tbody>
                    </Table>
                </div>
            </Card>
        </Row>
    );

};

export default PerformanceDashboard;