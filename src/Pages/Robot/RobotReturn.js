import Card from "react-bootstrap/Card";

import "../MainCSS.css"
import Chart from "react-apexcharts";
import {useEffect, useState} from "react";
import axios from "axios";

const RobotReturn = (props) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
            axios.get(props.server + 'robots/cumulative_ret/'+props.robot)
                .then(response => response['data'].map(data=>data))
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

    return (
        <Card className="card">
            <Card.Title className="card-header-first">Return</Card.Title>
            <Card.Body style={{padding: '0px'}}>
                <Chart
                    options={chartOptions.options}
                    series={chartOptions.series}
                    type={'line'}
                    width="100%"
                    height="100%"
                />
            </Card.Body>
        </Card>
    );
};

export default RobotReturn;