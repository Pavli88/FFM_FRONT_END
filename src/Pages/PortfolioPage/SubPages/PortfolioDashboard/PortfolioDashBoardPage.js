import DailyCashFlow from "./DailyCashFlow/DailyCashFlow";
import axios from "axios";
import {useContext, useEffect, useState, useRef} from "react";
import PortfolioPageContext from "../../context/portfolio-page-context";
import DateContext from "../../../../context/date-context";
import PortfolioHoldings from "../PortfolioHoldings/PortfolioHoldings/PortfolioHoldings";
import Card from "react-bootstrap/Card";
import {Nav} from "react-bootstrap";
import PortfolioNav from "./PortfolioNav/PortfolioNav";
import CashFlow from "./CashFlow/CashFlow";


const PortfolioDashBoardPage = (props) => {
    const firstDayOfYear = useContext(DateContext).firstDayOfCurrentYear;
    const portfoliCode = useContext(PortfolioPageContext).portfolioCode;
    const [navData, setNavData] = useState([{}])
    const [holdingDate, setHoldingDate] = useState();
    const [holdingData, setHoldingdata] = useState([{}])
    const [startDate, setStartDate] = useState(props.portfolioData.inception_date);
    const startDateRef = useRef();
    const [showCashFlowPanel, setShowCashflowPanel] = useState(false);
    const [cfData, setCfData] = useState({dates: [], series: [{}]});

    const fetchData = async() => {
        const response = await axios.get(props.server + 'portfolios/get/nav/', {
            params: {
                date__gte: startDate,
                portfolio_code: portfoliCode
            }
        })
        setNavData(response.data)
    };

    const fetchHoldingData = async() => {
        const response = await axios.get(props.server + 'portfolios/get/holding/', {
            params: {
                date: holdingDate,
                portfolio_code: portfoliCode
            }
        })
        setHoldingdata(response.data)
    };

    const fetchCFData = async() => {
        const response = await axios.get(props.server + 'portfolios/get/cashflow/', {
            params: {
                portfolio_code: portfoliCode
            }
        })
        setCfData(response.data)
    };

    useEffect(() => {
        if (portfoliCode !== undefined) {
            fetchData()
        }
    }, [portfoliCode, startDate])

    useEffect(() => {
        if (portfoliCode !== undefined) {
            fetchHoldingData()
        }
    }, [holdingDate])

    useEffect(() => {
        if (showCashFlowPanel === true) {
            fetchCFData();
        }
    }, [showCashFlowPanel])

    const runValuation = async () => {
        if (props.portfolioData.status !== 'Funded') {
            alert('Portfolio is not in active funded status. Valuation is not possible.')
        } else {
            if (startDateRef.current.value < props.portfolioData.inception_date) {
                alert('Valuation date is less than portfolio inception date. Valuation is not possible.')
            } else {
                const response = await axios.post(props.server + 'portfolios/calculate/holding/', {
                    start_date: startDateRef.current.value,
                    portfolio_code: portfoliCode
                })
                alert(response.data.response)
                fetchData()
            }
        }
    };

    return (
        <div style={{width: '100%', height: '100%', margin: '0px', padding: 15}}>

            <div style={{paddingBottom: 15}}>
                <Card>
                    <div className={'search-container'}>

                        <div>
                            <span className={'input-label'}>
                                Valuation Start Date
                            </span>
                        </div>

                        <div>
                            <input type={'date'} ref={startDateRef}
                                   defaultValue={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                        </div>

                        <div style={{width: 150, paddingLeft: 10}}>
                            <button className={'get-button'} onClick={runValuation}>Run
                                Valuation
                            </button>
                        </div>
                    </div>
                </Card>
            </div>

            <div style={{height: 300, width: '100%', display: 'flex'}}>
                <div style={{width: '100%', height: '100%', paddingRight: 15}}>
                    <PortfolioNav data={navData} showCF={() => setShowCashflowPanel(value => !value)} buttonStatus={showCashFlowPanel}/>
                </div>

                <div style={{width: '100%', height: '100%'}}>
                    {showCashFlowPanel ? <CashFlow data={cfData}/> : <DailyCashFlow server={props.server} data={navData}
                                                                      setHoldingDate={(date) => setHoldingDate(date)}/>}

                </div>

            </div>
            <div style={{paddingTop: 15}}>
                <PortfolioHoldings data={holdingData} date={holdingDate}/>
            </div>
        </div>
    );
};

export default PortfolioDashBoardPage;