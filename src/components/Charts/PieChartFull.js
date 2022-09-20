import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Chart from "react-apexcharts";

const PieChartFull = (props) => {
    const chartOptions = {
        options: {
            chart: {
                width: '100%',
                height: '100%',
                type: 'donut',
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return (Math.round(val * 100) / 100) + '%'
                },
            },
            title: {
                text: 'Winning Rate',
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
            legend: {
                show: false,
                showForSingleSeries: false,
                position: 'top',
            },
            colors: ['#489F33', '#DB604F'],
        },
    };
    return (
        <Card className="card" style={{margin: '0px'}}>
            <Card.Body style={{padding: '0px'}}>
                <Row style={{height: '100%', width: '100%', margin: '0px'}}>
                    <Col style={{height: '100%', width: '100%', margin: '0px'}}>
                        <Chart
                            options={chartOptions.options}
                            series={props.data}
                            type={'donut'}
                            width="100%"
                            height="90%"
                        />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};
export default PieChartFull;