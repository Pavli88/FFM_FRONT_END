import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Chart from "react-apexcharts";

const LineCharts = (props) => {
    const chartOptions = {
        options: {
            chart: {
                toolbar: false,
                id: "balance-cashflow"
            },
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
            yaxis: props.metaData.yaxis,
            dataLabels: {
                enabled: false
            },
        },

        title: {
            text: 'Cumulative Return',
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                // fontFamily: undefined,
                color: '#263238'
            },
        },
    };
    return (
        <Card className="card" style={{margin: '0px'}}>
            <Card.Title className="card-header-first">{props.metaData.title}</Card.Title>
            {props.subTitle}
            <Card.Body style={{padding: '0px'}}>
                <Row style={{height: '100%', width: '100%', margin: '0px'}}>
                    <Col style={{height: '100%'}}>
                        <div style={{padding: '0px', height: '100%'}}>
                            <Chart
                                options={chartOptions.options}
                                series={props.metaData.series}
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};
export default LineCharts;