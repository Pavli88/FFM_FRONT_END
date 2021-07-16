import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "../MainCSS.css"
import Chart from "react-apexcharts";
import {useEffect, useState} from "react";
import axios from "axios";

const PortfolioCashFlow = (props) => {

    const [dataSeries, setDataSeries] = useState([]);

    let chartOptions = {
        options: {
            chart: {
                toolbar: false,
                id: "basic-bar"
            },
            xaxis: {
                categories: [],
                labels: {show: true}
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
                data: dataSeries,
            }
        ]
    };

    useEffect(() => {
            axios.get(props.server + 'portfolios/get_cash_flow/', {
                params: {
                    portfolio: props.portfolio,
                    start_date: props.start_date,
                    end_date: props.end_date,
                }
            }).then(response => {
                setDataSeries(response['data']['amount'].map(data => data));
            }).catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    return (
        <Card className="card">
            <Card.Title className="card-header-first">Cash Flow History</Card.Title>
            <Card.Body>
                <Row style={{height:'100%', width:'100%', margin:'0px'}}>
                    <Col style={{height:'100%'}}>
                        <div style={{padding: '0px', height: '100%'}}>
                            <Chart
                                options={chartOptions.options}
                                series={chartOptions.series}
                                type={'bar'}
                                width="100%"
                                height="100%"/>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default PortfolioCashFlow;