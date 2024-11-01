import Card from "react-bootstrap/Card";
import Chart from "react-apexcharts";

const PortfolioDrawdown = (props) => {

    const chartConfig = {
        options: {
            chart: {
                toolbar: false,
                id: 'drawdown-chart',
                type: 'bar'
            },
            // colors: [function(value){
            //     console.log(value)
            //     if (value["value"] < 0){
            //         return '#E32227'
            //     }else {
            //         return '#007500'
            //     }
            // }],
            xaxis: {
                // categories: props.dates,
                labels: {
                    show: false,
                    style: {
                        colors: [],
                        fontSize: '8px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
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
                    show: false,
                    borderType: 'solid',
                    color: '#78909C',
                    height: 6,
                    offsetX: 0,
                    offsetY: 0
                },
            },
            title: {
                // text: "Outstanding P&L",
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
            yaxis: [
                {
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(2) + "%";
                        }
                    },
                },
            ],
            dataLabels: {
                enabled: false
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val.toFixed(2) + "%"; // Display tooltip values as percentages
                    }
                }
            }
        },
        series: [
            {
                name: 'Profit',
                data: props.data.map((d) => d*100)
            },
        ]
    }
    const lastRecord = Math.round(props.data[props.data.length - 1] * 10000) / 100

    return(
        <Card className="card" style={{height: '100%', width: '100%', margin: '0px'}}>
            <Card.Header>
                <div style={{display: 'flex'}}>
                    <div>
                        Drawdown
                    </div>
                    <span style={{
                            color: lastRecord < 0 ? 'red': 'green',
                            position: "absolute",
                            right: 15
                        }}>{lastRecord} %</span>
                </div>
            </Card.Header>
            <div style={{height: '100%'}}>
                <Chart
                    options={chartConfig.options}
                    series={chartConfig.series}
                    type={'area'}
                    width="100%"
                    height="100%"/>
            </div>
        </Card>
    )
};
export default PortfolioDrawdown;