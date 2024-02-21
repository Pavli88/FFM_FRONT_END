import Card from "react-bootstrap/Card";
import Chart from "react-apexcharts";

const DashBoardTotalPnl = (props) => {
    const funds = props.data.map((data) => data.portfolio_code)
    const pnl = props.data.map((data) => data.total)
    const netPnl = props.data.map((data) => data.net_pnl)
    const cost = props.data.map((data) => data.cost)

    const x = {
        options: {
            chart: {
                toolbar: true,
                stacked: false,
                type: 'bar',
            },
            xaxis: {
                categories: funds,
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
                show:false
            },
        },
        series: [
            {
                name: 'Gross P&L',
                data: pnl,
            },
            {
                name: 'Net P&L',
                data: netPnl,
            },
        ]
    }

    return (
        <Card className="card" style={{height: '100%', width: '100%', margin: '0px'}}>
            <Card.Header>
                <div style={{display: 'flex'}}>
                    <div style={{width: '50%'}}>
                        <div style={{fontSize: 12}}>
                            Gross P&L
                        </div>
                        <div style={{
                            // position: "absolute",
                            right: 5,
                            color: pnl.reduce((a, b) => a + b, 0) > 0 ? 'green' : 'red'
                        }}>
                            {Math.round(pnl.reduce((a, b) => a + b, 0) * 100) / 100}
                        </div>
                    </div>

                    <div style={{width: '50%'}}>
                        <div style={{fontSize: 12}}>
                            Net P&L
                        </div>
                        <div style={{
                            // position: "absolute",
                            right: 5,
                            color: netPnl.reduce((a, b) => a + b, 0) > 0 ? 'green' : 'red'
                        }}>
                            {Math.round(netPnl.reduce((a, b) => a + b, 0) * 100) / 100}
                        </div>
                    </div>

                    <div style={{width: '50%'}}>
                        <div style={{fontSize: 12}}>
                            Cost
                        </div>
                        <div style={{
                            // position: "absolute",
                            right: 5,
                            color: cost.reduce((a, b) => a + b, 0) > 0 ? 'green' : 'red'
                        }}>
                            {Math.round(cost.reduce((a, b) => a + b, 0) * 100) / 100}
                        </div>
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
export default DashBoardTotalPnl;