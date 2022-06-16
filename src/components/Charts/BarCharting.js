import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Chart from "react-apexcharts";


const BarCharting = (props) => {
    const yMax = Math.max(...props.data);
    console.log(props.data)
    const chartOptions = {
        options: {
            // chart: {
            //     toolbar: true,
            // },
            plotOptions: {
                bar: {
                    horizontal: props.horizontal
                }
            },
            xaxis: {
                categories: [],
                labels: {show: false}
            },
            yaxis: [
                {
                    tickAmount: 10,
                    labels: {
                        show: true,
                        style: {
                            colors: [],
                            fontSize: '12px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                            cssClass: 'apexcharts-yaxis-label',
                        },
                        // formatter: function (val) {
                        //     return val.toFixed(0);
                        // }
                    },
                }
            ],
            dataLabels: {
                enabled: true
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