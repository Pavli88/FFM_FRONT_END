import Card from 'react-bootstrap/Card';
import Table from "react-bootstrap/Table";
import {useEffect, useState} from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";

//CSS
import './PerfDashBoard.css'

const PerformanceDashboard = (props) => {
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
        <td className={'table-row'}>{record['robot']['name']}</td>
        <td className={'table-row'} style={{color: record['dtd_ret']<0.0 ? 'red': 'green'}}>{record['dtd_ret']} %</td>
        <td className={'table-row'} style={{color: record['mtd_ret']<0.0 ? 'red': 'green'}}>{record['mtd_ret']} %</td>
        <td className={'table-row'} style={{color: record['ytd_ret']<0.0 ? 'red': 'green'}}>{record['ytd_ret']} %</td>
    </tr>);

    return (
        <Card className="card" style={{margin: '0px'}}>
            <Card.Header>
                <Table style={{'margin': '0px'}}>
                    <thead>
                <tr style={{textDecoration: "none"}}>
                    <th className={'table-row'} style={{border: '0px', padding:'0px'}}>Robot</th>
                    <th className={'table-row'} style={{border: '0px', padding:'0px'}}>DTD</th>
                    <th className={'table-row'} style={{border: '0px', padding:'0px'}}>MTD</th>
                    <th className={'table-row'} style={{border: '0px', padding:'0px'}}>YTD</th>
                </tr>
                </thead>
                </Table>

            </Card.Header>
            <div style={{height: '500px', overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table>
                    <tbody>
                    {perfRespData}
                    </tbody>
                </Table>
            </div>
        </Card>
    );

};

export default PerformanceDashboard;