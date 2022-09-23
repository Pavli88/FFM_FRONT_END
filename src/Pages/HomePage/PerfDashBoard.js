import Card from 'react-bootstrap/Card';
import Table from "react-bootstrap/Table";
import {useEffect, useState} from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";

//CSS
import './PerfDashBoard.css'

const PerformanceDashboard = (props) => {
    const [perfData, setPerfData] = useState([]);
    console.log(perfData)
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
        <td className={'table-row'}>{record['robot']['name']}</td>
        <td className={'table-row'} style={{color: record['balance']<0.0 ? 'red': 'green'}}>{record['balance']}</td>
        <td className={'table-row'} style={{color: record['dtd_ret']<0.0 ? 'red': 'green'}}>{record['dtd_ret']} %</td>
        <td className={'table-row'} style={{color: record['mtd_ret']<0.0 ? 'red': 'green'}}>{record['mtd_ret']} %</td>
        <td className={'table-row'} style={{color: record['ytd_ret']<0.0 ? 'red': 'green'}}>{record['ytd_ret']} %</td>
    </tr>);

    return (
        <Row style={{height: '100%', width: '100%', margin: '0px'}}>
            <Card className="card" style={{margin: '0px'}}>
                <div style={{height: '500px', overflowY: 'scroll', overflowX: 'hidden'}}>
                    <Table>
                        <thead>
                        <tr>
                            <th className={'table-header'}>Robot</th>
                            <th className={'table-header'}>Balance</th>
                            <th className={'table-header'}>DTD</th>
                            <th className={'table-header'}>MTD</th>
                            <th className={'table-header'}>YTD</th>
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