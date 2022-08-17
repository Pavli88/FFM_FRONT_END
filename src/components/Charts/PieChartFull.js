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
                type: 'pie',
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return (Math.round(val * 100) / 100) + '%'
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
            <Card.Title className="card-header-first">{props.title}</Card.Title>
            <Card.Body style={{padding: '0px'}}>
                <Row style={{height: '100%', width: '100%', margin: '0px'}}>
                    <Col style={{height: '100%'}}>
                        <div style={{padding: '0px', height: '100%'}}>
                        <Chart
                            options={chartOptions.options}
                            series={props.data}
                            type={'pie'}
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
export default PieChartFull;