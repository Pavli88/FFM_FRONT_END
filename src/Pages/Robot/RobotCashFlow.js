import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Chart from "react-apexcharts";

import "../MainCSS.css"
import {useEffect, useState} from "react";
import axios from "axios";

const RobotCashFlow = (props) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
            axios.get(props.server + 'robots/robot_cash_flow/'+props.robot)
                .then(response => response['data'].map(data=>data['cash_flow']))
                .then(data=>setChartData(data))
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
                labels: {show: false}
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

    // const a = cashFlow.map(data => data['cash_flow']);
    // console.log(a)

    return (
        <Card className="card">
            <Card.Title className="card-header-first">Cash Flow</Card.Title>
            <Card.Body style={{padding: '0px'}}>
                <div style={{padding:'0px'}}>
                    <Chart
                    options={chartOptions.options}
                    series={chartOptions.series}
                    type={'bar'}
                    width="100%"
                    height="100%"
                />
                </div>
            </Card.Body>
        </Card>
    );
};

export default RobotCashFlow;