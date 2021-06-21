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

    console.log(perfData)

    const perfRespData = perfData.map((record) =>
    <tr key={record['robot']['id']}>
        <td className="table-row-robot-name">{record['robot']['name']}</td>
        <td className="table-row-other">{record['balance']}</td>
        <td className="table-row-other">{record['dtd_ret']} %</td>
        <td className="table-row-other">{record['mtd_ret']} %</td>
        <td className="table-row-other">{record['ytd_ret']} %</td>
    </tr>);

    return (
        <Card className={'shadow-sm'} style={{borderRadius:'0px'}}>
            {/*<Card.Header className="table-row-robot-name" as="h6">Performance</Card.Header>*/}
            <Card.Body style={{padding: '0px'}}>
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
            </Card.Body>
        </Card>
    );

};

export default PerformanceDashboard;