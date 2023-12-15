import Card from "react-bootstrap/Card";
import {CSVLink} from "react-csv";
import Chart from "react-apexcharts";

const DailyReturns = (props) => {
    const returns = props.data.map((data) => data.period_return * 100)
    const dates = props.data.map((data) => data.date)
    const x = {
        options: {
            chart: {
                toolbar: true,
                type: 'area',
                zoom: {
                    enabled: true,
                    type: 'x',
                    autoScaleYaxis: false,
                    zoomedArea: {
                        fill: {
                            color: '#90CAF9',
                            opacity: 0.4
                        },
                        stroke: {
                            color: '#0D47A1',
                            opacity: 0.4,
                            width: 1
                        }
                    }
                }
            },
            colors: [function(value){
                if (value["value"] < 0){
                    return '#E32227'
                }else {
                    return '#007500'
                }
            }],
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
                data: returns,
            },
        ]
    }
    return(
        <Card className="card" style={{height: '100%', width: '100%', margin: '0px'}}>
            <Card.Header>
                <div style={{display: 'flex'}}>
                    <div>
                        <span>Daily Returns</span>
                        <CSVLink data={props.data} style={{paddingLeft: 15}}>Download</CSVLink>
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
export default DailyReturns;