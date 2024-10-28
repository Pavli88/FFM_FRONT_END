import Card from "react-bootstrap/Card";
import Chart from "react-apexcharts";

const DashBoardTotalDrawdown = (props) => {
    const dates = props.data.map((data) => data.date)
    const nav = props.data.map((data) => data.drawdown)

    const x = {
        options: {
            chart: {
                toolbar: false,
                type: 'area',
            },
            xaxis: {
                categories: dates,
                type: 'date',
                labels: {
                    show: false,
                    style: {
                        colors: [],
                        fontSize: '8px',
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
                name: 'Drawdown',
                data: nav,
            },
        ]
    }
    const lastRecord = Math.round(nav[nav.length - 1] * 100) / 100;
    const maxDD = Math.round(Math.min(...nav) * 100)/100;
    return (
        <div className="card" style={{height: '100%', width: '100%'}}>
            <div className={'card-header'}>
                 <div style={{display: 'flex'}}>
                    <div>
                        Drawdown
                    </div>
                    <span style={{
                            color: lastRecord < 0 ? 'red': 'green',
                            paddingLeft: 15
                        }}>{lastRecord} %</span>
                     <span style={{
                            position: "absolute",
                            right: 90
                        }}>Max Drawdown</span>
                    <span style={{
                            color: lastRecord < 0 ? 'red': 'green',
                            position: "absolute",
                            right: 15
                        }}>{maxDD} %</span>
                </div>
            </div>
            <div style={{height: '100%'}}>
                <Chart
                    options={x.options}
                    series={x.series}
                    type={'area'}
                    width="100%"
                    height="100%"/>
            </div>
        </div>
    );
};
export default DashBoardTotalDrawdown;