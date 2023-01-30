import AllRobotsPnlsChart from "../HomePageCharts/AllRobotsPnlsChart";
import {useEffect, useState, useContext} from "react";

// Bootstrap Imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import Card from "react-bootstrap/Card";

// Chart Import
import Chart from "react-apexcharts";

// Context
import HomePageReportDateContext from "../contexts/HomePageReportDateContext";

const DailyPnlChart = (props) => {
    const columnChartOptions = {
        options: {
            chart: {
                toolbar: false,
                id: 'barChart_1',
                type: 'bar',
                // stacked:true,
            },
            colors: [function(value){
                if (value['value'] < 0){
                    return '#E32227'
                }else {
                    return '#007500'
                }
            }],
            annotations: {
                yaxis: [
                    {
                        y: -2.5,
                        borderColor: '#BF4737',
                        label: {
                            borderColor: '#BF4737',
                            position:'left',
                            style: {
                                color: '#fff',
                                background: '#BF4737'
                            },
                            text: '-2.5 %'
                        }
                    },
                    {
                        y: -5,
                        borderColor: '#BF4737',
                        label: {
                            borderColor: '#BF4737',
                            position:'left',
                            style: {
                                color: '#fff',
                                background: '#BF4737'
                            },
                            text: '-5%'
                        }
                    },
                ]
            },
            xaxis: {
                categories: props.dates,
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
                text: 'Daily Return %',
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
        series: [{
            data: props.data,
        }]
    };
    return (
        <Chart
            options={columnChartOptions.options}
            series={columnChartOptions.series}
            type={'bar'}
            width="100%"
            height="100%"/>
    );
};

const TopLevel = (props) =>{
    const requestParameters = useContext(HomePageReportDateContext)['requestParameters'];
    const robotColors = requestParameters['robots'].map((data) => data['color']);
    const [responseData, setResponseData] = useState([{}]);
    const [pnlChart, setPnlChart] = useState(<></>);

    const findCumulativeSum = arr => {
        const creds = arr.reduce((acc, val) => {
            let {sum, res} = acc;
            sum += val;
            res.push(sum);
            return {sum, res};
        }, {
            sum: 0,
            res: []
        });
        return creds.res;
    };

    const getAllRobotDailyReturns = async () => {
        const response = await axios.get(props.server + 'home/get/robot/all/daily_returns/', {
            params: {
                env: props.env,
                date: requestParameters['startDate'],
            }
        });
        setPnlChart(<DailyPnlChart data={response.data['total_returns']} dates={response.data['dates']}/>);
        const response2 = await axios.get(props.server + 'robots/get/pnls/', {
            params: {
                env: props.env,
                date: requestParameters['startDate'],
            }
        });
        setResponseData(response2.data['data'].map(data => data))
    };

    useEffect(() => {
        getAllRobotDailyReturns();
        }, [requestParameters]
    );

    return (
        <Row style={{height:'100%', width: '100%', margin: '0px', paddingLeft: '0px'}}>
            <Col style={{height: '100%', width: '50%', paddingLeft: '15px'}}>
                <AllRobotsPnlsChart data={responseData} colors={robotColors}/>
            </Col>
            <Col style={{height: '100%', width: '50%', display: 'flex'}}>
                <Card className="card" style={{margin: '2px', height: '100%'}}>
                    <Card.Body style={{padding: '0px'}}>
                        {pnlChart}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
};

export default TopLevel;
