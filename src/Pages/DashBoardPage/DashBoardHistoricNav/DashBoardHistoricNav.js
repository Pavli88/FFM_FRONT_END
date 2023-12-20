import Card from "react-bootstrap/Card";
import Chart from "react-apexcharts";

const DashBoardHistoricNav = (props) => {
    const dates = props.data.map((data) => data.date)
    const nav = props.data.map((data) => data.total)
    const holding_nav = props.data.map((data) => data.holding_nav)
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
                position: 'top',
                offsetY: 10
            },
        },
        series: [
            {
                name: 'NAV',
                data: nav,
            },
            {
                name: 'Holding NAV',
                data: holding_nav,
            },
        ]
    }

    return (
        <Card className="card" style={{height: '100%', width: '100%', margin: '0px'}}>
            <Card.Header>
                Total NAV History Automated
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
    );
};
export default DashBoardHistoricNav;