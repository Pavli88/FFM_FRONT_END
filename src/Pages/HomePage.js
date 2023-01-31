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
    const [requestParameters, setRequestParameters] = useState({'startDate': '', 'robots': []});
    const [drawDown, setDrawdown]  = useState(<></>);

    const metaData = {
        'server': useContext(ServerContext)['server'],
        'env': useContext(EnvContext)['environment']
    }
    console.log(requestParameters)

    // const getAllRobotDailyReturns = async () => {
    //     const response = await axios.get(server + 'robots/get/all/drawdown/', {
    //         params: {
    //             env: env,
    //             date: reportingStartDate,
    //         }});
    //     setDrawdown(<DrawdownChart data={response.data['drawdown']}/>);
    // };

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
                    <Col style={{height: '400px', paddingRight: '0px', paddingLeft: '0px'}}>
                        <TopLevel {...metaData}/>
                        <BalanceDashBoard {...metaData}/>
                    </Col>
                    <Col style={{height: '600px', paddingRight: '0px', paddingLeft: '0px'}}>
                        <ContributionPnl {...metaData}/>
                        <PerfDashBoard {...metaData}/>
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