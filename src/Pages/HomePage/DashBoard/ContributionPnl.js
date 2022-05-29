import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import BarCharting from "../../../components/Charts/BarCharting";
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
                }
            })
                .then(response => setDtdData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    useEffect(() => {
            axios.get(props.server + 'home/robot_pnl/', {
                params: {
                    start_date: date.substr(0,7)+'-01',
                }
            })
                .then(response => setMtdData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );
    useEffect(() => {
            axios.get(props.server + 'home/robot_pnl/', {
                params: {
                    start_date: date.substr(0,4)+'-01-01',
                }
            })
                .then(response => setYtdData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    return (
        <Row style={{height: '300px', width: '100%', margin: '0px', padding: '10px'}}>
            <Col style={{height: '100%'}}>
                <BarCharting data={dtdData} horizontal={true}/>
            </Col>
            <Col style={{height: '100%'}}>
                <BarCharting data={mtdData} horizontal={true}/>
            </Col>
            <Col style={{height: '100%'}}>
                <BarCharting data={ytdData} horizontal={true}/>
            </Col>
        </Row>
    );
};

export default ContributionPnl;