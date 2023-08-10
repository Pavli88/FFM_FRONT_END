import Card from "react-bootstrap/Card";
import {CSVLink} from "react-csv";
import Chart from "react-apexcharts";

const DashBoardNavWidget = (props) => {
    const x = {
        options: {
            chart: {
                toolbar: false,
                type: 'area',
            },
            colors: [function(value){
                if (value["value"] < 0){
                    return '#E32227'
                }else {
                    return '#007500'
                }
            }],
            xaxis: {
                categories: props.y,
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
                enabled: true
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
                name: 'NAV',
                data: props.x,
            },
        ]
    }

    const y = {
        options: {
            chart: {
                toolbar: false,
                type: 'donut',
            },
            colors: [function(value){
                if (value["value"] < 0){
                    return '#E32227'
                }else {
                    return '#007500'
                }
            }],
            xaxis: {
                categories: props.y,
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
                enabled: true
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
                name: 'NAV',
                data: props.x,
            },
        ]
    }

    return (
        <div style={{display: "flex", height: '400px', width: '1000px', padding: 15}}>
            <div style={{width: '50%', paddingRight: 15}}>
                <Card className="card" style={{height: '100%', width: '100%', margin: '0px'}}>
                    <Card.Header>
                        <div style={{display: 'flex'}}>
                            <div>
                                <span>NAV by Portfolios</span>
                            </div>
                            <div style={{position: "absolute", right: 15}}>
                                    <span>{props.x.reduce((a, b) => a + b, 0)}</span>
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
            </div>
            <div style={{width: '50%'}}>
                <Card className="card" style={{height: '100%', width: '100%', margin: '0px'}}>
                    <Card.Header>
                        <div style={{display: 'flex'}}>
                            <div>
                                <span>NAV by Portfolios</span>
                            </div>
                        </div>
                    </Card.Header>
                    <div style={{height: '100%'}}>
                        <Chart
                            options={y.options}
                            series={y.series}
                            type={'donut'}
                            width="100%"
                            height="100%"/>
                    </div>
                </Card>
            </div>
        </div>
    )
};
export default DashBoardNavWidget;