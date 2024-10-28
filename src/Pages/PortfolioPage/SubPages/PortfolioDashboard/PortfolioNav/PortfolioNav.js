import Card from "react-bootstrap/Card";
import Chart from "react-apexcharts";
import { CSVLink, CSVDownload } from "react-csv";

const PortfolioNav = (props) => {
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
                labels: {show: false},
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
            {
                name: 'Holding NAV',
                data: holding_nav,
            },
        ]
    }

    return (
        <Card className="card" style={{height: '100%', width: '100%', margin: '0px'}}>
            <Card.Header>
                <div style={{display: 'flex'}}>
                    <div>
                        <span>Nav</span>
                        <CSVLink data={props.data} style={{paddingLeft: 15}}>Download</CSVLink>
                    </div>
                    <div style={{position: "absolute", right: 220}}>
                        <button className={'get-button'} onClick={() => props.showCF('NAV')}>NAV Composition</button>
                    </div>
                    <div style={{position: "absolute", right: 135}}>
                        <button className={'get-button'} onClick={() => props.showCF('CF')}>Cashflow</button>
                    </div>
                    <div style={{position: "absolute", right: 15}}>
                        <button className={'get-button'} onClick={() => props.showCF('CB')}>Cash Balance</button>
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