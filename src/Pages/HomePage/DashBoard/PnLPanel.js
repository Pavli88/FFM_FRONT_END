// Bootstrap Imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CardWidget from "../../../components/CardWidget";
import {useEffect, useState} from "react";
import axios from "axios";

const PnLPanel = (props) => {
    const date = new Date().toISOString().substr(0,10);
    const [dtdData, setDtdData] = useState(0.0);
    const [mtdData, setMtdData] = useState(0.0);
    const [ytdData, setYtdData] = useState(0.0);

    useEffect(() => {
            axios.get(props.server + 'home/total_robot_pnl/', {
                params: {
                    start_date: date,
                }
            })
                .then(response => setDtdData(response['data'][0]['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    useEffect(() => {
            axios.get(props.server + 'home/total_robot_pnl/', {
                params: {
                    start_date: date.substr(0,7)+'-01',
                }
            })
                .then(response => setMtdData(response['data'][0]['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );
    useEffect(() => {
            axios.get(props.server + 'home/total_robot_pnl/', {
                params: {
                    start_date: date.substr(0,4)+'-01-01',
                }
            })
                .then(response => setYtdData(response['data'][0]['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );
    return (
        <>
            <Col style={{height:'100%'}}>
                <CardWidget title={'DTD'}>
                    <h1 style={{margin:'0px'}}>{dtdData}</h1>
                </CardWidget>
            </Col>
            <Col style={{height:'100%'}}>
                <CardWidget title={'MTD'}>
                    <h1>{mtdData}</h1>
                </CardWidget>
            </Col>
            <Col style={{height:'100%'}}>
                <CardWidget title={'YTD'}>
                    <h1>{ytdData}</h1>
                </CardWidget>
            </Col>
        </>
    );
};

export default PnLPanel;