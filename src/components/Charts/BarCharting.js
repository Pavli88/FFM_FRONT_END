import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Chart from "react-apexcharts";
import {useEffect, useState} from "react";
import axios from "axios";

const BarCharting = (props) => {
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
                name: "Aggregated Robot Profit and Loss",
                data: props.data,
            }
        ]
    };

    return (
        <Card className="card" style={{margin:'0px'}}>
            <Card.Title className="card-header-first">{props.title}</Card.Title>
            <Card.Body style={{padding: '0px'}}>
                <Row style={{height: '100%'}}>
                    <Col style={{height: '100%'}}>
                        <Chart
                            options={chartOptions.options}
                            series={chartOptions.series}
                            type={'bar'}
                            width="100%"
                            height="100%"
                        />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default BarCharting;