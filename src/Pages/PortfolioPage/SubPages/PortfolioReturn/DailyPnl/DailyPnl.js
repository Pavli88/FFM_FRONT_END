import Card from "react-bootstrap/Card";
import {CSVLink} from "react-csv";
import Chart from "react-apexcharts";

const DailyPnl = (props) => {
    const dates = props.data.map((data) => data.date)
    const realized = props.data.map((data) => data.pnl)
    const unrealized = props.data.map((data) => data.unrealized_pnl)

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
                name: 'Realized',
                data: realized,
            },
            {
                name: 'Unrealized',
                data: unrealized,
            },
        ]
    }

    return (
        <Card className="card" style={{height: '100%', width: '100%', margin: '0px'}}>
            <Card.Header>
                <div style={{display: 'flex'}}>
                    <div>
                        Daily P&L
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
    )
};
export default DailyPnl;