import Card from "react-bootstrap/Card";
import Chart from "react-apexcharts";
import ExposureHolding from "./ExposureHolding";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import PortfolioPageContext from "../../../context/portfolio-page-context";
import DateContext from "../../../../../context/date-context";

const PositionExposure = (props) => {
    const portfoliCode = useContext(PortfolioPageContext).portfolioCode;
    const currentDate = useContext(DateContext).currentDate;
    const [holdingData, setHoldingdata] = useState([{}])
    const [nav, setNav] = useState(0.0)
    const [currentContribs, setCurrentContribs] = useState([]);

    const fetchHoldingData = async() => {
        const response = await axios.get(props.server + 'portfolios/get/exposures/', {
            params: {
                date: currentDate,
                portfolio_code: portfoliCode
            }
        })
        setHoldingdata(response.data.data)
        setNav(response.data.nav)
    };

    useEffect(() => {
        if (portfoliCode !== undefined) {
            fetchHoldingData()
        }
    }, [portfoliCode])

    const setContribs = (data) => {
        setCurrentContribs(data)
    };
    console.log(currentContribs)
    const x = {
        options: {
            chart: {
                toolbar: false,
                stacked: false,
                type: 'bar',
            },
            xaxis: {
                categories: currentContribs['names'],
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
                name: 'Current',
                data: currentContribs['contribs'],
            },
        ]
    }

    return (
        <div style={{display: 'flex', height: 400, paddingBottom: 15}}>
            <div style={{height: '100%', width: '70%', margin: '0px', paddingRight: 15}}>
                 <Card className="card" style={{height: '100%'}}>
                <Card.Header>
                    <div style={{display: 'flex'}}>
                        <div>
                            Exposure by Instrument
                        </div>
                        <div>
                            {nav}
                        </div>
                    </div>
                </Card.Header>
                <ExposureHolding data={holdingData} contribs={setContribs}/>
            </Card>
            </div>

            <Card className="card" style={{height: '100%', width: '30%', margin: '0px'}}>
                <Card.Header>
                    <div style={{display: 'flex'}}>
                        <div>
                            Simulation
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
    )
};
export default PositionExposure;