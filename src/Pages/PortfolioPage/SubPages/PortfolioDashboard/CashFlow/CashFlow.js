import Card from "react-bootstrap/Card";
import Chart from "react-apexcharts";

const CashFlow = (props) => {
    const { dates, series } = props.data;
    console.log(dates, series)
    const x = {
        options: {
            chart: {
                toolbar: false,
                stacked: true,
                type: 'bar',
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
        series: series,
    }
    return(
        <Card className="card" style={{height: '100%', width: '100%', margin: '0px'}}>
            <Card.Header>
                <div style={{display: 'flex'}}>
                    <div>
                        Cash Flow
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
export default CashFlow;