import Card from "react-bootstrap/Card";
import Chart from "react-apexcharts";

const DashBoardMonthlyPnl = (props) => {
    const dates = props.data.map((data) => data.date)
    const pnl = props.data.map((data) => data.pnl)

    const x = {
        options: {
            chart: {
                toolbar: true,
                stacked: true,
                type: 'bar',
                events: {
                    click(event, chartContext, config) {
            props.setHoldingDate(config.config.xaxis.categories[config.dataPointIndex])
        }
                }
            },
            xaxis: {
                categories: dates,
                type: 'date',
                labels: {
                    show: true,
                    style: {
                        colors: [],
                        fontSize: '10px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 1000,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
                axisBorder: {
                    show: false,
                    color: '#78909C',
                    height: 1,
                    width: '100%',
                    offsetX: 0,
                    offsetY: 0
                },
                axisTicks: {
                    show: true,
                    borderType: 'solid',
                    color: '#78909C',
                    height: 6,
                    offsetX: 0,
                    offsetY: 0
                },
            },
            yaxis: [
                {
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(2);
                        }
                    },
                },
            ],
            dataLabels: {
                enabled: false
            },
            fill: {
                opacity: 1
            },
            legend: {
                position: 'right',
                offsetY: 40
            },
        },
        series: [
            {
                name: 'P&L',
                data: pnl,
            },
        ]
    }

    return (
        <Card className="card" style={{height: '100%', width: '100%', margin: '0px'}}>
            <Card.Header>
                <div style={{display: 'flex'}}>
                    <div>
                        P&L by Months
                    </div>
                </div>
            </Card.Header>
            <div style={{height: '100%'}}>
                <Chart
                    options={x.options}
                    series={x.series}
                    type={'bar'}
                    width="100%"
                    height="100%"/>
            </div>
        </Card>
    );
};
export default DashBoardMonthlyPnl;