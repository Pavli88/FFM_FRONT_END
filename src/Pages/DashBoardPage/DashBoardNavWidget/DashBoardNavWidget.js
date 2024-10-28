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
            xaxis: {
                categories: props.y,
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
                type: 'pie',
            },
            xaxis: {
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
            labels: props.y
        },
        series: props.x
    }

    return (

                <div className="card" style={{height: '100%', width: '100%', margin: '0px'}}>
                    <div className={'card-header'}>
                        <div style={{display: 'flex'}}>
                            <div>
                                <span>NAV by {props.title}</span>
                            </div>
                            <div style={{position: "absolute", right: 15}}>
                                    <span>{props.x.reduce((a, b) => a + b, 0)}</span>
                                </div>
                        </div>
                    </div>
                    <div style={{display: "flex", height: '100%'}}>
                        <div style={{height: '100%', width: '50%'}}>
                            <Chart
                                options={x.options}
                                series={x.series}
                                type={'bar'}
                                width="100%"
                                height="100%"/>
                        </div>
                        <div style={{height: '100%', width: '50%'}}>
                            <Chart
                                options={y.options}
                                series={y.series}
                                type={'pie'}
                                width="100%"
                                height="100%"/>
                        </div>
                    </div>
                </div>

    )
};
export default DashBoardNavWidget;