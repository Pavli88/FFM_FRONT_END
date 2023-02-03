import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button'

import axios from "axios";
import {useContext, useEffect, useState, useRef} from "react";

import HomeNavBar from "./HomePage/DashBoard/HomeNavBar";
import ContributionPnl from "./HomePage/DashBoard/ContributionPnl";
import PerfDashBoard from "./HomePage/PerfDashBoard";
import BalanceDashBoard from "./HomePage/DashBoard/BalanceDashboard";

// Chart Imports
import ChartWidget from "../Widgets/Charts/ChartWidget";
import ExposureChartConfig from "./HomePage/HomePageCharts/ExposureChartConfig";
import ProfitsChartsConfig from "./HomePage/HomePageCharts/ProfitsChartsConfig";
import DrawDownChartConfig from "./HomePage/HomePageCharts/DrawDownChartConfig";
import PnlChartConfig from "./HomePage/HomePageCharts/PnlChartConfig";
import PnlHistoryChartConfig from "./HomePage/HomePageCharts/PnlHistoryChartConfig";

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';

// Contexts
import EnvContext from "../context/env-context";
import ServerContext from "../context/server-context";
import HomePageReportDateContext from "./HomePage/contexts/HomePageReportDateContext";
import DateContext from "../context/date-context";

// Icons
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";


const HomePage = (props) => {
    // Date variables
    const currentDate = useContext(DateContext)['currentDate'];
    const startDate = useContext(DateContext)['currentDate'];
    const [requestParameters, setRequestParameters] = useState({'startDate': '', 'robots': []});
    const robotColors = requestParameters['robots'].map((data) => data['color']);
    const [pnlHistory, setPnlHistory] = useState({
        'data': []
    });
    const [pnlChart, setPnlChart] = useState({
        'dates': [],
        'pnls': [],
        'total_returns': []
    });
    const [drawDown, setDrawdown]  = useState({
        'dates': [],
        'drawdown': []
    });
    const [exposureData, setExposureData] = useState({
        'avg_price': [],
        'name': [],
        'pnl': [],
        'quantity': [],
        'ret': [],
        'ret_to_total': []
    });
    const metaData = {
        'server': useContext(ServerContext)['server'],
        'env': useContext(EnvContext)['environment']
    }
    const isMounted = useRef(false);
    const fetchAllData = async () => {
        const exposureResponse = await axios.get(metaData.server + 'robots/get/exposures/', {
            params: {
                env: metaData.env,
                date: currentDate,
            }
        });
        const drawDownResponse = await axios.get(metaData.server + 'robots/get/all/drawdown/', {
            params: {
                env: metaData.env,
                date: requestParameters['startDate'],
            }});
        const dailyReturnsResponse = await axios.get(metaData.server + 'home/get/robot/all/daily_returns/', {
            params: {
                env: metaData.env,
                date: requestParameters['startDate'],
            }
        });
        const pnlHistoryResponse = await axios.get(metaData.server + 'robots/get/pnls/', {
            params: {
                env: metaData.env,
                date: requestParameters['startDate'],
            }
        });
        setExposureData(exposureResponse['data']);
        setDrawdown(drawDownResponse['data']);
        setPnlChart(dailyReturnsResponse['data']);
        setPnlHistory(pnlHistoryResponse['data']);
    };
    useEffect(() => {
        if (isMounted.current) {
            fetchAllData();
        } else {
            isMounted.current = true;
        }
        }, [requestParameters]
    );

    const exposureChartParameters = ExposureChartConfig(exposureData);
    const profitChartConfig = ProfitsChartsConfig(exposureData);
    const drawDownChartConfig = DrawDownChartConfig(drawDown);
    const dailyPnlChartConfig = PnlChartConfig({
        'dates': pnlChart['dates'],
        'data': pnlChart['pnls'],
        'title': 'Daily P&L'
    });
    const dailyReturnsChartConfig = PnlChartConfig({
        'dates': pnlChart['dates'],
        'data': pnlChart['total_returns'],
        'title': 'Daily Total Return'
    });
    const pnlHistoryChartConfig = PnlHistoryChartConfig({
        'data': pnlHistory['data'] === 'undefinded' ? [{'name': '', 'data': []}] : pnlHistory['data'],
        'colors': robotColors
    });
    console.log(exposureData['ret_to_total'].reduce((a, b) => a + b, 0))
    // console.log(pnlHistory['data'][pnlHistory['data'].length - 1])
    const totalExposure = (Math.round(exposureData['ret_to_total'].reduce((a, b) => a + b, 0))*100)/100
    const exposureTitle = <div style={{display:'flex', height: '100%'}}>
        <p style={{margin: 0}}>Exposure</p>
        <Row style={{position: 'absolute', right: 5, margin: 0, padding: 0}}>
            <Col style={{margin: 0, color: totalExposure < 0 ? 'red': 'green', display: 'flex'}}>
                <Col stlye={{paddingRight: '5px'}}>
                    {totalExposure < 0 ? <BsCaretDownFill/> : <BsCaretUpFill/>}
                </Col>
                <p>{totalExposure} %</p>
            </Col>
        </Row>
    </div>
    const totalOutstandingProfit = Math.round(exposureData['pnl'].reduce((a, b) => a + b, 0)*100)/100
    const outstandingProfitTitle = <div style={{display:'flex'}}>
        <p style={{margin: 0}}>Outstanding Profit</p>
        <Row style={{position: 'absolute', right: 5, margin: 0, padding: 0}}>
            <Col style={{margin: 0, color: totalOutstandingProfit < 0 ? 'red': 'green', display: 'flex'}}>
                <Col stlye={{paddingRight: '5px'}}>
                    {totalOutstandingProfit < 0 ? <BsCaretDownFill/> : <BsCaretUpFill/>}
                </Col>
                <p >{totalOutstandingProfit}</p>
            </Col>
        </Row>
    </div>
    return (
        <HomePageReportDateContext.Provider value={{
            requestParameters: requestParameters,
            saveRequestParameters: setRequestParameters,
        }}>
            <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight}} fluid>
                <Row style={{paddingTop: '20px'}}>
                    <HomeNavBar {...metaData}/>
                </Row>
                <Row style={{height: '100%', paddingTop:'20px'}}>
                    <Col style={{height: '600px', paddingRight: '0px', paddingLeft: '0px'}}>
                        <Tabs
                            defaultActiveKey="risk"
                            id="risk-balance"
                            className="mb-3"
                            fill
                            style={{margin: 0}}
                        >
                            <Tab eventKey="risk" title="Risk" style={{height: '100%'}}>
                                <Row style={{height: '100%', padding:'0px'}}>
                                    <Col>
                                        <Row style={{height: '300px', margin: '0px'}}>
                                            <Col style={{height: '100%', margin: '0px'}}>
                                                <ChartWidget {...exposureChartParameters} name={exposureTitle}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row style={{height: '300px', margin: '0px'}}>
                                            <Col style={{height: '100%', margin: '0px'}}>
                                                <ChartWidget {...profitChartConfig} name={outstandingProfitTitle}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row style={{height: '400px', margin: '0px', marginTop:'20px'}}>
                                    <Col>
                                        <ChartWidget {...drawDownChartConfig} name={'Total Drawdown'}/>
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab eventKey="balance" title="Balance">
                                <Row style={{height: '500px', margin: '0px'}}>
                                    <BalanceDashBoard {...metaData}/>
                                </Row>
                            </Tab>
                    </Tabs>
                    </Col>
                    <Col style={{height: '600px', paddingRight: '0px', paddingLeft: '0px'}}>
                        <Tabs
                            defaultActiveKey="profit"
                            id="fill-tab-example"
                            className="mb-3"
                            fill
                            style={{margin:0}}
                        >
                            <Tab eventKey="profit" title="Profit">
                                <Row style={{height: '100%', padding:'0px'}}>
                                    <ContributionPnl {...metaData}/>
                                </Row>
                                <Row style={{height: '400px', paddingLeft: '0px', marginTop:'20px'}}>
                                    <Col>
                                        <ChartWidget {...pnlHistoryChartConfig} name={'Profit History'}/>
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab eventKey="performance" title="Performance">
                                <Row style={{height: '300px', margin: '0px'}}>
                                    <Col>
                                        <ChartWidget {...dailyReturnsChartConfig} name={'Daily Performance'}/>
                                    </Col>
                                    <Col>

                                    </Col>
                                </Row>
                                <Row style={{height: '400px', margin: '0px', marginTop: '20px'}}>
                                    <PerfDashBoard {...metaData}/>
                                </Row>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </HomePageReportDateContext.Provider>
    );
};

export default HomePage;