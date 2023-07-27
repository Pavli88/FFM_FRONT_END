import PortfolioTransactionPnl from "./PortfolioTransactionPnl/PortfolioTransactionPnl";
import CumulativePerformance from "./CumulativePerformance";
import DailyReturns from "./DailyReturns/DailyReturns";
import MonthlyReturns from "./MonthlyReturns/MonthlyReturns";
import AggregatedPnl from "./AggregatedPnls/AggregatedPnl";
import {useContext, useEffect, useRef, useState} from "react";
import PortfolioPageContext from "../../context/portfolio-page-context";
import ServerContext from "../../../../context/server-context";
import axios from "axios";
import Card from "react-bootstrap/Card";
import {BsArrowRepeat} from "react-icons/bs";

const PortfolioReturnPage = () => {
    const server = useContext(ServerContext)['server'];
    const portfoliCode = useContext(PortfolioPageContext).portfolioCode;
    const portfolioData = useContext(PortfolioPageContext).portfolioData;
    const [pnlData, setPnlData] = useState([{}]);
    const [navData, setNavData] = useState([{}])
    const [pnlBreakdowns, setPnlBreakdowns] = useState({
        'by_name': [],
        'by_group': [],
        'by_type': [],
    })
    const [startDate, setStartDate] = useState(portfolioData.inception_date);
    const startDateRef = useRef();

    const pnlResults = pnlData.map((data) => data.realized_pnl);
    const returnsRounded = navData.map((data) => 1 + data.period_return)

    const findCumulativeMultiply = arr => {
        let value = 1
        let list = []
        for (let i = 0; i < arr.length; i += 1) {
            value *= arr[i];
            list.push(value)
        }
        return list
    };

    const findCumulativeSum = arr => {
        const creds = arr.reduce((acc, val) => {
            let {sum, res} = acc;
            sum += val;
            res.push(sum);
            return {sum, res};
        }, {
            sum: 0,
            res: []
        });
        return creds.res;
    };

    const fetchData = async() => {
        const response = await axios.get(server + 'portfolios/get/transactions/pnl/', {
            params: {
                portfolio_code: portfoliCode
            }
        })
        setPnlData(response.data)
    };

    const fetchPerfData = async () => {
        const response = await axios.get(server + 'portfolios/get/nav/', {
            params: {
                date__gte: portfolioData.inception_date,
                portfolio_code: portfoliCode
            }
        })
        setNavData(response.data)
    };

    const fetchAggSecPnlData = async () => {
        const response = await axios.get(server + 'portfolios/aggregated_pnl/', {
            params: {
                start_date: '2023-01-01',
                portfolio_code: portfoliCode
            }
        })
        setPnlBreakdowns(response.data)
    };

    useEffect(()=>{
        fetchData();
        fetchPerfData();
        fetchAggSecPnlData();
    }, [portfoliCode])

    return (
        <div style={{height: '900px', width: '100%', padding: 15}}>
            <div style={{paddingBottom: 15}}>
                <Card>
                    <div className={'search-container'}>
                        <div style={{paddingLeft: 15, paddingTop: 5}}>
                        <span className={'input-label'} style={{textAlign: "left"}}>
                            Start Date
                        </span>
                        </div>

                        <div>
                            <input type={'date'} ref={startDateRef}
                                   defaultValue={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                        </div>

                        <div style={{width: 150, paddingLeft: 10}}>
                            <button className={'get-button'}>Get
                            </button>
                        </div>
                    </div>
                </Card>
            </div>


            <div style={{height: '760px', overflowY: "scroll"}}>
                <div style={{paddingBottom: 15}}>
                    <MonthlyReturns/>
                </div>

                <div style={{display: 'flex'}}>
                    <div style={{width: '50%', height: 300, paddingRight: 15}}>
                        <CumulativePerformance data={navData}
                                               returns={findCumulativeMultiply(returnsRounded).map((data) => (data - 1) * 100)}/>
                    </div>
                    <div style={{width: '50%', height: 300}}>
                        <DailyReturns data={navData}/>
                    </div>
                </div>

                <div style={{display: 'flex'}}>
                    <div style={{width: '50%', height: 400, paddingRight: 15, paddingTop: 15}}>
                        <PortfolioTransactionPnl data={findCumulativeSum(pnlResults)}
                                                 currency={portfolioData.currency}/>
                    </div>
                    <div style={{width: '50%', display: "flex"}}>
                        <div style={{width: '100%', height: 400, paddingRight: 15, paddingTop: 15}}>
                            <AggregatedPnl name={'P&L by Security'}
                                           xAxis={pnlBreakdowns.by_name.map((data) => data.name)}
                                           yAxis={pnlBreakdowns.by_name.map((data) => data.realized_pnl)}/>
                        </div>
                        <div style={{width: '100%', height: 400, paddingRight: 15, paddingTop: 15}}>
                            <AggregatedPnl name={'P&L by Group'}
                                           xAxis={pnlBreakdowns.by_group.map((data) => data.group)}
                                           yAxis={pnlBreakdowns.by_group.map((data) => data.realized_pnl)}/>
                        </div>
                        <div style={{width: '100%', height: 400, paddingTop: 15}}>
                            <AggregatedPnl name={'P&L by Type'} xAxis={pnlBreakdowns.by_type.map((data) => data.type)}
                                           yAxis={pnlBreakdowns.by_type.map((data) => data.realized_pnl)}/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PortfolioReturnPage;