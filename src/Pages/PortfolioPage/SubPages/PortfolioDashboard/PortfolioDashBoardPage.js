import NavComposition from "./NavComposition/NavComposition";
import axios from "axios";
import {useContext, useEffect, useState, useRef} from "react";
import PortfolioPageContext from "../../context/portfolio-page-context";
import DateContext from "../../../../context/date-context";
import PortfolioHoldings from "../PortfolioHoldings/PortfolioHoldings/PortfolioHoldings";
import PortfolioNav from "./PortfolioNav/PortfolioNav";
import CashFlow from "./CashFlow/CashFlow";
import CashBalance from "./CashBalance/CashBalance";
import Section from "../../../../components/Layout/Section";

const PortfolioDashBoardPage = (props) => {
    const firstDayOfYear = useContext(DateContext).firstDayOfCurrentYear;
    const currentDate = useContext(DateContext).currentDate;
    const portfoliCode = useContext(PortfolioPageContext).portfolioCode;
    const [navData, setNavData] = useState([{}])
    const [holdingDate, setHoldingDate] = useState(currentDate);
    const [holdingData, setHoldingdata] = useState([{}])
    const [startDate, setStartDate] = useState(props.portfolioData.inception_date);
    const startDateRef = useRef();
    const [showCashFlowPanel, setShowCashflowPanel] = useState('NAV');
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

    const changeDate = (date) => {
        setHoldingDate(date);
    };

    useEffect(() => {
        if (showCashFlowPanel === 'CF') {
            fetchCFData();
        }
    }, [showCashFlowPanel])

    return (
        <div style={{width: '100%', height: '100%', margin: '0px', padding: 15}}>

            <Section title="NAV History">
                <div style={{height: 300, width: '100%', display: 'flex'}}>
                    <div style={{width: '100%', height: '100%', paddingRight: 15}}>
                        <PortfolioNav data={navData} showCF={(data) => setShowCashflowPanel(data)}/>
                    </div>

                    <div style={{width: '100%', height: '100%'}}>
                        {showCashFlowPanel === 'NAV' ? <NavComposition server={props.server} data={navData}
                                                                       setHoldingDate={(date) => setHoldingDate(date)}/> : showCashFlowPanel === 'CF' ?
                            <CashFlow data={cfData}/> :
                            <CashBalance data={navData} setHoldingDate={(date) => setHoldingDate(date)}/>}

                    </div>

                </div>
            </Section>

            <Section title="Holding">
                <PortfolioHoldings data={holdingData} date={holdingDate} changeDate={changeDate}/>
            </Section>
        </div>
    );
};

export default PortfolioDashBoardPage;