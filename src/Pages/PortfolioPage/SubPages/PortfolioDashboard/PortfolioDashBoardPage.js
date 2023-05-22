import DailyCashFlow from "./DailyCashFlow/DailyCashFlow";
import axios from "axios";
import {useContext, useEffect, useState, useRef} from "react";
import PortfolioPageContext from "../../context/portfolio-page-context";
import DateContext from "../../../../context/date-context";
import PortfolioHoldings from "../PortfolioHoldings/PortfolioHoldings/PortfolioHoldings";
import Card from "react-bootstrap/Card";
import {Nav} from "react-bootstrap";
import PortfolioNav from "./PortfolioNav/PortfolioNav";


const PortfolioDashBoardPage = (props) => {
    const firstDayOfYear = useContext(DateContext).firstDayOfCurrentYear;
    const portfoliCode = useContext(PortfolioPageContext).portfolioCode;
    const [navData, setNavData] = useState([{}])
    const [holdingDate, setHoldingDate] = useState();
    const [holdingData, setHoldingdata] = useState([{}])
    const startDateRef = useRef();

    const fetchData = async() => {
        const response = await axios.get(props.server + 'portfolios/get/nav/', {
            params: {
                date__gte: '2023-01-01',
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

    useEffect(() => {
        if (portfoliCode != undefined) {
            fetchData()
        }
    }, [portfoliCode])

    useEffect(() => {
        if (portfoliCode != undefined) {
            fetchHoldingData()
        }
    }, [holdingDate])

    const runValuation = async () => {
        const response = await axios.post(props.server + 'portfolios/calculate/holding/', {
            start_date: startDateRef.current.value,
            portfolio_code: portfoliCode
        })
        fetchData()
    };

    return (
        <div style={{width: '100%', height: '100%', margin: '0px', padding: 15}}>

            <div style={{paddingBottom: 15}}>
                <Card>
                    <div className={'search-container'}>

                        <div>
                            <span className={'input-label'}>
                                Start Date
                            </span>
                        </div>

                        <div>
                            <input type={'date'} ref={startDateRef}
                                   defaultValue={firstDayOfYear}/>
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
                <div style={{width: '50%', height: '100%', paddingRight: 15}}>
                    <PortfolioNav data={navData}/>
                </div>

                <div style={{width: '50%', height: '100%'}}>
                    <DailyCashFlow server={props.server} data={navData}
                                   setHoldingDate={(date) => setHoldingDate(date)}/>
                </div>

            </div>
            <div style={{paddingTop: 15}}>
                <PortfolioHoldings data={holdingData} date={holdingDate}/>
            </div>
        </div>
    );
};

export default PortfolioDashBoardPage;