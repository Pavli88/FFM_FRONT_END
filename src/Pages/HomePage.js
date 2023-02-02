import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";

import axios from "axios";
import {useContext, useEffect, useState, useRef} from "react";

import HomeNavBar from "./HomePage/DashBoard/HomeNavBar";
import ContributionPnl from "./HomePage/DashBoard/ContributionPnl";
import PerfDashBoard from "./HomePage/PerfDashBoard";

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
        console.log(pnlHistoryResponse);

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
        'data': pnlHistory['data'],
        'colors': robotColors
    });
    return (
        <HomePageReportDateContext.Provider value={{
            requestParameters: requestParameters,
            saveRequestParameters: setRequestParameters,
        }}>
            <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight}} fluid>
                <Row style={{paddingTop: '15px'}}>
                    <HomeNavBar {...metaData}/>
                </Row>
                <Row style={{height: '100%'}}>
                    <Col style={{paddingRight: '0px', paddingLeft: '0px', background: 'green'}}>
                        <Row>
                            <Col>
                                <Row style={{height: '300px', margin: '0px'}}>
                                    <Col style={{height: '100%', margin: '0px'}}>
                                        <ChartWidget {...exposureChartParameters}/>
                                    </Col>
                                </Row>
                                <Row style={{height: '300px', background: 'red', margin: '0px'}}>
                                    <Col style={{height: '100%', margin: '0px'}}>
                                        <ChartWidget {...profitChartConfig}/>
                                    </Col>
                                </Row>
                                <Row style={{height: '300px'}}>

                                </Row>
                            </Col>
                            <Col>

                            </Col>
                        </Row>
                    </Col>
                    <Col style={{height: '600px', paddingRight: '0px', paddingLeft: '0px'}}>
                        <Row style={{height: '300px', margin: '0px'}}>
                            <ChartWidget {...pnlHistoryChartConfig}/>
                        </Row>
                        <Row style={{height: '300px', margin: '0px'}}>
                            <ChartWidget {...dailyReturnsChartConfig}/>
                        </Row>
                        <Row style={{height: '300px', margin: '0px'}}>
                            <ChartWidget {...drawDownChartConfig}/>
                        </Row>
                    </Col>
                </Row>
                {/*<Row style={{height: '400px'}}>*/}
                {/*    <Col>*/}
                {/*        <TopLevel {...metaData}/>*/}
                {/*        <BalanceDashBoard {...metaData}/>*/}
                {/*    </Col>*/}
                    <Col>
                        <ContributionPnl {...metaData}/>
                        <PerfDashBoard {...metaData}/>
                    </Col>
                {/*</Row>*/}
            </Container>
        </HomePageReportDateContext.Provider>
    );
};

export default HomePage;