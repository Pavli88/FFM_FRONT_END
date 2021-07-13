import Card from "react-bootstrap/Card";

import "../MainCSS.css"
import {useEffect, useState} from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const RobotBalance = (props) => {

    const [chartData, setChartData] = useState([]);

    console.log(chartData[chartData.length-1])
    useEffect(() => {
            axios.get(props.server + 'robots/get_balance/', {
                params: {
                    robot: props.robot,
                    start_date: props.start_date,
                    end_date: props.end_date,
                }
            })
                .then(response => response['data'].map(data => data['close_balance']))
                .then(data => setChartData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );


    const chartOptions = {
        options: {
            chart: {
                toolbar: false,
                id: "basic-bar"
            },
            xaxis: {
                categories: [],
                labels: {show: false},
                axisTicks: {
                    show: false,
                    borderType: 'solid',
                    color: '#78909C',
                    height: 6,
                    offsetX: 0,
                    offsetY: 0
                },
            },
            grid: {
                show: false,
                borderColor: '#90A4AE',
                strokeDashArray: 0,
                position: 'back',
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                yaxis: {
                    lines: {
                        show: false
                    }
                },
                row: {
                    colors: undefined,
                    opacity: 0.5
                },
                column: {
                    colors: undefined,
                    opacity: 0.5
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
            },
            yaxis: [
                {
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(0);
                        }
                    }
                }
            ],
            dataLabels: {
                enabled: false
            },

        },

        series: [
            {
                name: "series-1",
                data: chartData,
            }
        ]
    };

    return (
        <Card className="card">
            <Card.Title className="card-header-first">Balance: {chartData[chartData.length - 1]}</Card.Title>
            <Card.Body style={{padding: '0px'}}>
                <Chart
                    options={chartOptions.options}
                    series={chartOptions.series}
                    type='line'
                    width="100%"
                    height="100%"
                />
            </Card.Body>
        </Card>
    );
};

export default RobotBalance;