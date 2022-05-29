import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Chart from "react-apexcharts";
import {useEffect, useState} from "react";
import axios from "axios";

const PieCharts = (props) => {

    const chartOptions = {
        options: {
            // chart: {
            //     toolbar: false,
            // },
            labels: props.labels,
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return (Math.round(val * 100) / 100) + '%'
                },
            },
        },
        series: props.data
    };
    return (
         <Card className="card" style={{margin: '0px'}}>
            <Card.Title className="card-header-first">{props.title}</Card.Title>
            <Card.Body style={{padding: '0px'}}>
                <Row style={{height: '100%'}}>
                    <Col style={{height: '100%'}}>
                        <Chart
                            options={chartOptions.options}
                            series={chartOptions.series}
                            type={'donut'}
                            width="100%"
                            height="100%"
                        />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default PieCharts;





