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

    const closeSelectedTransactions = async () => {
        const response = await axios.post(props.server + 'trade_page/new/signal/', {
                ids: currentContribs['transaction_ids'],
                transaction_type: 'risk_closure'
            }
        );
        alert(response.data)
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
                labels: {
                    show: true,
                    style: {
                        colors: [],
                        fontSize: '8px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 1000,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
                axisBorder: {
                    show: true,
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
                show: true,
                position: 'left',
                fontSize: 10
            },
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
             {
                name: 'Amended',
                data: currentContribs['sim_contribs_amended'],
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
                // type: 'date',
                labels: {
                    show: true,
                    style: {
                        colors: [],
                        fontSize: '8px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 1000,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
                axisBorder: {
                    show: true,
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


    return (
        <div style={{paddingBottom: 15}}>
            <div style={{height: 450, width: '100%', margin: '0px', display: "flex", paddingBottom: 15}}>
                <div style={{width: '100%'}}>
                    <Card className="card" style={{height: '100%'}}>
                        <Card.Header>
                            <div style={{display: 'flex'}}>
                                <div>
                                    Exposure at
                                </div>
                                <div style={{paddingLeft: 5}}>
                                    {currentDate}
                                </div>
                                <div>
                                    <CSVLink data={holdingData} style={{paddingLeft: 15}}>Download</CSVLink>
                                </div>

                                <div style={{display: "flex", position: "absolute", right: 15}}>
                                    <div style={{paddingRight: 15}}>
                                        Simulated Market Movement Against Positions
                                    </div>
                                    <div>
                                        <input ref={stressRef} style={{padding: 0, width: 50}} type={'number'}
                                               defaultValue={0.5} min={0.5}
                                               step={0.5}/>
                                    </div>
                                    <div>
                                        %
                                    </div>
                                    <div style={{paddingLeft: 15}}>
                                        <button className={'get-button'} onClick={() => fetchHoldingData()}>
                                            <BsArrowRepeat></BsArrowRepeat></button>
                                    </div>
                                    <div style={{paddingLeft: 15}}>
                                        <button className={'get-button'} onClick={() => {
                                            if (window.confirm('Do you want to close the selected transactions ?')){
                                                closeSelectedTransactions()
                                            };

                                        }}>
                                            Close Selected</button>
                                    </div>
                                </div>

                            </div>
                        </Card.Header>
                        <ExposureHolding data={holdingData} contribs={setContribs}/>
                    </Card>
                </div>
            </div>

            <div style={{display: "flex", width: '100%', height: 450, paddingBottom: 100}}>
                <Card className="card" style={{height: '100%', margin: '0px', width: '40%'}}>
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

                <div style={{height: '100%', margin: '0px', paddingLeft: 15, width: '40%'}}>
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

                <div style={{width: '20%', paddingLeft: 15}}>
                    <Card style={{height: '100%'}}>
                        <Card.Header>
                            Simulated Results
                        </Card.Header>
                        <div style={{height: '100%'}}>

                            <div style={{padding: 15}}>

                                <div style={{display: "flex", paddingBottom: 10}}>
                                    <div style={{paddingRight: 15}}>
                                        Holding NAV
                                    </div>
                                    <div style={{
                                        paddingRight: 15,
                                        color: nav > 0.0 ? 'green' : 'red',
                                        position: "absolute",
                                        right: 0
                                    }}>
                                        {nav}
                                    </div>
                                </div>

                                <div style={{display: "flex", paddingBottom: 10}}>
                                    <div style={{paddingRight: 15}}>
                                        Simulated NAV
                                    </div>
                                    <div style={{
                                        paddingRight: 15,
                                        color: simNav > 0.0 ? 'green' : 'red',
                                        position: "absolute",
                                        right: 0
                                    }}>
                                        {simNav}
                                    </div>
                                </div>

                                <div style={{display: "flex", paddingBottom: 10}}>
                                    <div style={{paddingRight: 15}}>
                                        Drawdown
                                    </div>
                                    <div style={{
                                        paddingRight: 15,
                                        color: simDD > 0.0 ? 'green' : 'red',
                                        position: "absolute",
                                        right: 0
                                    }}>
                                        {simDD} %
                                    </div>
                                </div>

                                <div style={{display: "flex", paddingBottom: 10}}>
                                    <div style={{paddingRight: 15}}>
                                        Close Out P&L
                                    </div>
                                    <div style={{
                                        paddingRight: 15,
                                        color: currentContribs['close_pnl'] > 0.0 ? 'green' : 'red',
                                        position: "absolute",
                                        right: 0
                                    }}>
                                        {currentContribs['close_pnl']}
                                    </div>
                                </div>

                            </div>


                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
};
export default PositionExposure;