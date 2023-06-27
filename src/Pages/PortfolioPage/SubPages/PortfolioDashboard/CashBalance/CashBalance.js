import Card from "react-bootstrap/Card";
import {CSVLink} from "react-csv";
import Chart from "react-apexcharts";

const CashBalance = (props) => {
    const dates = props.data.map((data) => data.date)
    const nav = props.data.map((data) => (data.cash_val/data.total) * 100)
    const x = {
        options: {
            chart: {
                toolbar: false,
                type: 'area',
        //         events: {
        //             click(event, chartContext, config) {
        //     console.log(config, chartContext)
        // }
        //         }
            },
            xaxis: {
                categories: dates,
                type: 'date',
                labels: {show: true},
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
                name: 'Cash Balance',
                data: nav,
            },
        ]
    }
    return (<Card className="card" style={{height: '100%', width: '100%', margin: '0px'}}>
            <Card.Header>
                <div style={{display: 'flex'}}>
                    <div>
                        <span>Cash Balance %</span>
                    </div>
                </div>
            </Card.Header>
            <div style={{height: '100%'}}>
                <Chart
                    options={x.options}
                    series={x.series}
                    type={'area'}
                    width="100%"
                    height="100%"/>
            </div>
        </Card>)
};
export default CashBalance;