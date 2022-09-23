import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import BarCharting from "../../../components/Charts/BarCharting";
import HomePeriodsPnlsCharts from "../HomePageCharts/HomePeriodsPnlsCharts";

import {useEffect, useState} from "react";
import axios from "axios";

const ContributionPnl = (props) => {
    const date = new Date().toISOString().substr(0,10);
    const [dtdData, setDtdData] = useState([]);
    const [mtdData, setMtdData] = useState([]);
    const [ytdData, setYtdData] = useState([]);

    useEffect(() => {
            axios.get(props.server + 'home/robot_pnl/', {
                params: {
                    start_date: date,
                    env: props.env,
                }
            })
                .then(response => setDtdData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
            axios.get(props.server + 'home/robot_pnl/', {
                params: {
                    start_date: date.substr(0,7)+'-01',
                    env: props.env,
                }
            })
                .then(response => setMtdData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
            axios.get(props.server + 'home/robot_pnl/', {
                params: {
                    start_date: date.substr(0,4)+'-01-01',
                    env: props.env,
                }
            })
                .then(response => setYtdData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    return (
        <Row style={{height: '100%', width: '100%', margin: '0px'}}>
            <Col style={{height: '100%'}}>
                <HomePeriodsPnlsCharts data={dtdData} horizontal={false} xLabel={true} title={'Day to Date'}/>
            </Col>
            <Col style={{height: '100%'}}>
                <HomePeriodsPnlsCharts data={mtdData} horizontal={false} xLabel={true} title={'Month to Date'}/>
            </Col>
            <Col style={{height: '100%'}}>
                <HomePeriodsPnlsCharts data={ytdData} horizontal={false} xLabel={true} title={'Year to Date'}/>
            </Col>
        </Row>
    );
};

export default ContributionPnl;