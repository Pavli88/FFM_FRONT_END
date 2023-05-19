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
    const firstUpdate = useRef(true);
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
        if (firstUpdate.current) {
            firstUpdate.current = false;
        } else {
            fetchData()
        }
    }, [portfoliCode])

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
        } else {
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
                    <div style={{display: "flex"}}>
                        <div style={{padding: 5}}>
                            <Nav.Link href="#" disabled>
                                Start Date
                            </Nav.Link>
                        </div>
                        <div style={{padding: 5}}>
                            <input type={'date'} style={{height: '100%'}} ref={startDateRef} defaultValue={firstDayOfYear}/>
                        </div>
                        <div style={{width: 200, padding: 5}}>
                            <button className={'save-button'} style={{background: "blue"}} onClick={runValuation}>Run Valuation</button>
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