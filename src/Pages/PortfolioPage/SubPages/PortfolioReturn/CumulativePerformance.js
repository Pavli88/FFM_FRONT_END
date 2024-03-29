import Card from "react-bootstrap/Card";
import {CSVLink} from "react-csv";
import Chart from "react-apexcharts";

const CumulativePerformance = (props) => {
    const dates = props.data.map((data) => data.date)
    const x = {
        options: {
            chart: {
                toolbar: false,
                type: 'area',
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
                name: 'Performance',
                data: props.returns,
            },
        ]
    }
    const lastRecord = Math.round(props.returns[props.returns.length - 1] * 100)/100
    return(
        <Card className="card" style={{height: '100%', width: '100%', margin: '0px'}}>
            <Card.Header>
                <div style={{display: 'flex'}}>
                    <div>
                        <span>Cumulative Performance</span>
                        <CSVLink data={props.data} style={{paddingLeft: 15}}>Download</CSVLink>
                        <span style={{
                            color: lastRecord < 0 ? 'red': 'green',
                            position: "absolute",
                            right: 15
                        }}>{lastRecord} %</span>
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
        </Card>
    )
};
export default CumulativePerformance;