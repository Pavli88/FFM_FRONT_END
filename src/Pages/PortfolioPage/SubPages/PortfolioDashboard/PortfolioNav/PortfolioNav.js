import Card from "react-bootstrap/Card";
import Chart from "react-apexcharts";

const PortfolioNav = (props) => {
    const dates = props.data.map((data) => data.date)
    const nav = props.data.map((data) => data.total)
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
                name: 'NAV',
                data: nav,
            },
        ]
    }

    return (
        <Card className="card" style={{height: '100%', width: '100%', margin: '0px'}}>
            <Card.Header>
                <div style={{display: 'flex'}}>
                    <div>
                        Nav
                    </div>
                    <div style={{position: "absolute", right: 15}}>
                        <button className={'get-button'} onClick={() => props.showCF()}>{props.buttonStatus ? 'NAV Composition': 'Cashflow'}</button>
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
    );
};
export default PortfolioNav;