import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";

import PerfDashBoard from "./HomePage/PerfDashBoard";
import {useContext, useEffect, useState} from "react";

import TopLevel from "./HomePage/DashBoard/TopLevel";
import BalanceDashBoard from "./HomePage/DashBoard/BalanceDashboard";
import ContributionPnl from "./HomePage/DashBoard/ContributionPnl";
import HomeNavBar from "./HomePage/DashBoard/HomeNavBar";

// Chart Imports

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';

// Contexts
import EnvContext from "../context/env-context";
import ServerContext from "../context/server-context";
import HomePageReportDateContext from "./HomePage/contexts/HomePageReportDateContext";

import axios from "axios";
import Chart from "react-apexcharts";

const DrawdownChart = (props) => {
    const chartOptions = {
        options: {
            chart: {
                toolbar: false,
                id: 'drawdown-chart',
            },
            stroke: {
                curve: 'smooth',
            },
            // colors: props.colors,
            xaxis: {
                categories: [],
                labels: {show: false},
                axisBorder: {
                    show: false,
                    color: '#78909C',
                    height: 1,
                    width: '100%',
                    offsetX: 0,
                    offsetY: 0
                },
            axisTicks: {
                    show: false,
                    borderType: 'solid',
                    color: '#78909C',
                    height: 6,
                    offsetX: 0,
                    offsetY: 0
                },
            },
            title: {
                text: "Total Drawdown History",
                align: 'left',
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontFamily: undefined,
                    color: '#263238'
                },
            },
            yaxis: [
                {
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(0);
                        }
                    },
                }
            ],
            dataLabels: {
                enabled: false
            },
        },
        series: [
            {
                data:props.data
            }
        ]
    };
    return(
        <Card className="card" style={{margin: '2px', height: '100%'}}>
            <Card.Body style={{padding: '0px'}}>
                <Chart
                    options={chartOptions.options}
                    series={chartOptions.series}
                    type={props.type}
                    width="100%"
                    height="100%"/>
            </Card.Body>
        </Card>
    );
};

const HomePage = (props) => {
    // Date variables
    const date = new Date();
    const firstDayOfYear = new Date(date.getFullYear(), date.getMonth(), 2).toISOString().substr(0,10);
    const [reportingStartDate, setReportingStartDate] = useState(firstDayOfYear);

    // Context variables
    const env = useContext(EnvContext)['environment'];
    const server = useContext(ServerContext)['server'];
    const [activeRobotsData, setActiveRobotsData] = useState([]);
    const [drawDown, setDrawdown]  = useState(<></>);

    const getAllRobotDailyReturns = async () => {
        const response = await axios.get(server + 'robots/get/all/drawdown/', {
            params: {
                env: env,
                date: reportingStartDate,
            }});
        console.log(response.data)
        setDrawdown(<DrawdownChart data={response.data['drawdown']}/>);
    };

    useEffect(() => {
            axios.get(server + 'robots/get/active/' + env)
                .then(response => setActiveRobotsData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
            getAllRobotDailyReturns();
        }, [props, reportingStartDate]
    );

    return (
        <HomePageReportDateContext.Provider value={{
            reportingDate: reportingStartDate,
            saveReportingDate: setReportingStartDate,
        }}>
            <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight}} fluid>
                <Row style={{paddingTop: '15px'}}>
                    <HomeNavBar/>
                </Row>
                <Row style={{height: '100%'}}>
                    <Col style={{height: '400px', paddingRight: '0px', paddingLeft: '0px'}}>
                        <TopLevel server={server} env={env} robots={activeRobotsData}/>
                        <BalanceDashBoard server={server} env={env} robots={activeRobotsData}/>
                    </Col>
                    <Col style={{height: '600px', paddingRight: '0px', paddingLeft: '0px'}}>
                        <ContributionPnl server={server} env={env}/>
                        <PerfDashBoard server={server} env={env} env={env}/>
                    </Col>
                </Row>
                <Row style={{height: '300px'}}>
                    <Col>
                        {drawDown}
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </Container>
        </HomePageReportDateContext.Provider>
    );
};

export default HomePage;