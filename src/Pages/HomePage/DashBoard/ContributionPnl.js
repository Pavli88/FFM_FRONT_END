import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {BsCaretDownFill, BsCaretUpFill} from "react-icons/bs";

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
                .then(response => response['data'])
                .then(data => setDtdData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
            axios.get(props.server + 'home/robot_pnl/', {
                params: {
                    start_date: date.substr(0,7)+'-01',
                    env: props.env,
                }
            })
                .then(response => response['data'])
                .then(data => setMtdData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
            axios.get(props.server + 'home/robot_pnl/', {
                params: {
                    start_date: date.substr(0,4)+'-01-01',
                    env: props.env,
                }
            })
                .then(response => response['data'])
                .then(data => setYtdData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );
    const titleGenerator = (title, value) => {
        return <div style={{display: 'flex'}}>
            <p style={{margin: 0}}>{title}</p>
            <Row style={{position: 'absolute', right: 5, margin: 0, padding: 0}}>
                <Col style={{margin: 0, color: value < 0 ? 'red' : 'green', display: 'flex'}}>
                    <Col stlye={{paddingRight: '5px'}}>
                        {value < 0 ? <BsCaretDownFill/> : <BsCaretUpFill/>}
                    </Col>
                    <p>{value}</p>
                </Col>
            </Row>
        </div>
    };
    const dtdTotal = Math.round(dtdData.map(data => data['y']).reduce((a, b) => a + b, 0)*100)/100
    const mtdTotal = Math.round(mtdData.map(data => data['y']).reduce((a, b) => a + b, 0)*100)/100
    const ytdTotal = Math.round(ytdData.map(data => data['y']).reduce((a, b) => a + b, 0)*100)/100
    return (
        <Row style={{height: '300px', width: '100%', margin: '0px'}}>
            <Col style={{height: '100%'}}>
                <HomePeriodsPnlsCharts data={dtdData} horizontal={false} xLabel={true} title={'Day to Date'} name={titleGenerator('DTD', dtdTotal)}/>
            </Col>
            <Col style={{height: '100%'}}>
                <HomePeriodsPnlsCharts data={mtdData} horizontal={false} xLabel={true} title={'Month to Date'} name={titleGenerator('MTD', mtdTotal)}/>
            </Col>
            <Col style={{height: '100%'}}>
                <HomePeriodsPnlsCharts data={ytdData} horizontal={false} xLabel={true} title={'Year to Date'} name={titleGenerator('YTD', ytdTotal)}/>
            </Col>
        </Row>
    );
};

export default ContributionPnl;