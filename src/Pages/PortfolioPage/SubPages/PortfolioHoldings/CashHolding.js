import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "../../../MainCSS.css"
import Chart from "react-apexcharts";
import {useEffect, useState} from "react";
import axios from "axios";

const CashHoldings = (props) => {
    // console.log(props.data)
    const chartData = props.data.map((item)=>({'name':item['currency'], 'data': [0, item['amount'], 0]}));

    console.log(chartData);

    const chartOptions = {
        options: {
            chart: {
                toolbar: false,
                id: "basic-bar",
                type: 'bar',
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
                    },
                    title: {
            text: 'Ammount'
          }
                }
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },

        },
        series: chartData
    };
    return (
        <Card className="card" style={{margin: '0px'}}>
            <Card.Title className="card-header-first">Cash Holdings</Card.Title>
            <Card.Body style={{padding: '0px'}}>
                <Row style={{height: '100%'}}>
                    <Col style={{height: '100%'}}>
                        <Chart
                            options={chartOptions.options}
                            series={chartOptions.series}
                            type="bar"
                            width="100%"
                            height="100%"/>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default CashHoldings;