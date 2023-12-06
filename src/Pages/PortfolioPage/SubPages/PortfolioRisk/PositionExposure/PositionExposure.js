import Card from "react-bootstrap/Card";
import Chart from "react-apexcharts";
import ExposureHolding from "./ExposureHolding";
import axios from "axios";
import {useContext, useEffect, useRef, useState} from "react";
import { BsArrowRepeat } from "react-icons/bs";
import PortfolioPageContext from "../../../context/portfolio-page-context";
import DateContext from "../../../../../context/date-context";
import {CSVLink} from "react-csv";

const PositionExposure = (props) => {
    const portfoliCode = useContext(PortfolioPageContext).portfolioCode;
    const currentDate = useContext(DateContext).currentDate;
    const [holdingData, setHoldingdata] = useState([{}])
    const [updatedHoldingData, setUpdatedHoldingdata] = useState([{}])
    const [nav, setNav] = useState(0.0)
    const [simNav, setSimNav] = useState(0.0)
    const [simDD, setSimDD] = useState(0.0)
    const [currentContribs, setCurrentContribs] = useState([]);
    const stressRef = useRef();

    const fetchHoldingData = async() => {
        const response = await axios.get(props.server + 'portfolios/get/exposures/', {
            params: {
                date: currentDate,
                portfolio_code: portfoliCode,
                stress_percentage: stressRef.current.value
            }
        })
        setHoldingdata(response.data.data)
        setNav(response.data.nav)
        setSimNav(response.data.sim_nav)
        setSimDD(response.data.sim_dd)
    };

    useEffect(() => {
        if (portfoliCode !== undefined) {
            fetchHoldingData()
        }
    }, [portfoliCode])

    const setContribs = (data) => {
        setCurrentContribs(data)
    };

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
            // legend: {
            //     position: 'right',
            //     offsetY: 40
            // },
        },
        series: [
            {
                name: 'Current',
                data: currentContribs['contribs'],
            },
            {
                name: 'Simulated',
                data: currentContribs['sim_contribs'],
            },
        ]
    };

    const y = {
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
            // legend: {
            //     position: 'right',
            //     offsetY: 40
            // },
        },
        series: [
            {
                name: 'Current',
                data: currentContribs['sensitivity'],
            },
        ]
    }

    const amendRowStatus = (tranID) => {
        // console.log(tranID)
        const updatedData = holdingData.map((data) => {

            if (data['transaction_id'] === tranID) {
                console.log(data)
                if (data['ticked'] === false) {
                    data['sim_contr'] = 0.0
                }else{
                    console.log(data['contribution'])
                    data['sim_contr'] = 2
                };
                data['ticked'] = !data['ticked']
                // console.log(data)
                return data
            } else {
                return data
            }
            ;
        })
        setUpdatedHoldingdata(updatedData)
    };
    console.log(updatedHoldingData.length)
    return (
        <div style={{display: 'flex', height: 400, paddingBottom: 15}}>
            <div style={{height: '100%', width: '60%', margin: '0px', paddingRight: 15}}>
                 <Card className="card" style={{height: '100%'}}>
                <Card.Header>
                    <div style={{display: 'flex'}}>
                        <div>
                            Exposure
                        </div>
                        <div>
                            <CSVLink data={holdingData} style={{paddingLeft: 15}}>Download</CSVLink>
                        </div>

                        <div style={{position: "absolute", right: 10, display: "flex"}}>
                            <div style={{paddingRight: 15}}>
                                Holding NAV
                            </div>
                            <div style={{paddingRight: 15, color: nav > 0.0 ? 'green': 'red'}}>
                                {nav}
                            </div>
                            <div style={{paddingRight: 15}}>
                                Simulated NAV
                            </div>
                            <div style={{paddingRight: 15, color: simNav > 0.0 ? 'green': 'red'}}>
                                {simNav}
                            </div>
                            <div style={{paddingRight: 15}}>
                                Drawdown
                            </div>
                            <div style={{paddingRight: 15, color: simDD > 0.0 ? 'green': 'red'}}>
                                {simDD} %
                            </div>
                            <div style={{paddingRight: 15}}>
                                Stress %
                            </div>
                            <div>
                                <input ref={stressRef} style={{padding: 0, width: 50}} type={'number'} defaultValue={1.0} min={1.0}
                                       step={0.5}/>
                            </div>
                            <div style={{paddingLeft: 15}}>
                                <button className={'get-button'} onClick={() => fetchHoldingData()}><BsArrowRepeat></BsArrowRepeat></button>
                            </div>
                        </div>

                    </div>
                </Card.Header>
                <ExposureHolding data={updatedHoldingData.length > 1 ? updatedHoldingData: holdingData} contribs={setContribs} amend={amendRowStatus}/>
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

            <div style={{height: '100%', width: '30%', margin: '0px', paddingLeft: 15}}>
                <Card className="card" style={{height: '100%'}}>
                    <Card.Header>
                        <div style={{display: 'flex'}}>
                            <div>
                                Sensitivity
                            </div>
                        </div>
                    </Card.Header>
                    <div style={{height: '100%'}}>
                        <Chart
                            options={y.options}
                            series={y.series}
                            type={'bar'}
                            width="100%"
                            height="100%"/>
                    </div>
                </Card>
            </div>

        </div>
    )
};
export default PositionExposure;